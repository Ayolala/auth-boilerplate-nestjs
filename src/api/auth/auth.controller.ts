import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './local-strategy/local.guard';
import { JwtGuard } from './jwt-strategy/jwt.guard';
import {
  error,
  success,
  Event,
  hash,
  randomDigits,
  random,
  unifyPhoneNumber,
  mask,
  isNullOrUndefined,
} from '../../utils';
import { EventEmitter2 } from 'eventemitter2';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User, UserService } from '../user';
import { RegisterByServiceUserDto, RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto, RefreshTokenDto, UpdateProfileByServiceDto, UpdateProfileDto } from './dto/update-user.dto';
import { GetUser } from '../../decorators';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';

@Controller('user')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    this.eventEmitter.emit(Event.USER_BEFORE_REGISTER, { user });

    let {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      gender,
      referral_code,
      device_id,
      device_type,
      source,
    } = user;

    const raw_phone_number = phone_number;
    phone_number = unifyPhoneNumber(phone_number);

    const existingUser =
      await this.userService.userRepository.findOne({
        select: ['id', 'phone_number', 'email'],
        where: [{ phone_number: raw_phone_number }, { phone_number }, { email }],
      }) ?? null;

    // enforce unique phone number code
    if (existingUser?.phone_number === raw_phone_number || existingUser?.phone_number === phone_number) {
      return error('Registration', 'Looks like you already have an account. Phone number already exist');
    }

    // enforce unique email code
    if (existingUser?.email === email) {
      return error('Registration', 'Looks like you already have an account. Email already exist');
    }

    // get referrer ID
    const referrer = referral_code
      ? await this.userService.userRepository.findOne({
          select: ['id', 'email', 'phone_number'],
          where: [{ referral_code }],
        })
      : null

    // generate user referral code
    const referral_codeExist = async (referral_code: string) => {
      const user = await this.userService.userRepository.findOne({
        referral_code,
      });
      return !!user?.referral_code;
    };
    let userReferralCode = random(12);
    while ((await referral_codeExist(userReferralCode)) === true) {
      userReferralCode = random(12);
    }

    // generate user customer id
    const customerIdExist = async (customer_id: string) => {
      const user = await this.userService.userRepository.findOne({
        customer_id,
      });
      return !!user?.customer_id;
    };
    let userCustomerId = '' + randomDigits(12);
    while ((await customerIdExist(userCustomerId)) === true) {
      userCustomerId = '' + randomDigits(12);
    }

    const newUser = await this.userService.create({
      first_name,
      last_name,
      email,
      phone_number,
      gender,
      device_id,
      device_type,
      source,
      referrer_id: referrer?.id ?? null,
      referral_code: userReferralCode,
      customer_id: userCustomerId,
      password: hash(password),
      category: null,
    });


    this.eventEmitter.emit(Event.NEVER_BOUNCE_VERIFY, { user: newUser });

    this.eventEmitter.emit(Event.USER_AFTER_REGISTER, {
      user: {
        ...newUser,
        password: null,
        pin: null,
        bvn: null,
      },
    });

    const token = await this.authService.login(newUser);

    return success(
      {
        token: token.token,
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        phone_number: newUser.phone_number,
        gender: newUser.gender,
        device_id: newUser.device_id,
        device_type: newUser.device_type,
        source: newUser.source,
        referrer_id: newUser.referrer_id,
        referral_code: newUser.referral_code,
        customer_id: newUser.customer_id,
        tier: newUser.tier,
        password: null,
        pin: mask(newUser.pin),
        bvn: mask(newUser.bvn),
      },
      'User Registration',
      'User successfully registered',
    );
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() user: LoginUserDto, @GetUser() authUser: User) {
    this.eventEmitter.emit(Event.USER_BEFORE_LOGIN, { user });
    const token = await this.authService.login(authUser);
    const userMeta = {
      device_id: user?.device_id ?? authUser.device_id,
      device_type: user?.device_type ?? authUser.device_type,
      // gcm_device_token: user?.gcm_device_token ?? authUser.gcm_device_token,
    }

    this.userService.update(authUser.id, userMeta);
    const {
      first_name,
      last_name,
      email,
      phone_number,
      device_id,
      device_type,
      referrer_id,
      referral_code,
      customer_id,
      tier,
    } = authUser;

    if(isNullOrUndefined(authUser.fraudulent)) {
      this.eventEmitter.emit(Event.NEVER_BOUNCE_VERIFY, { user: { ...authUser } });
    }

    this.eventEmitter.emit(Event.USER_AFTER_LOGIN, { user: { ...authUser, ...userMeta } });

    // return authUser;
    return success(
      {
        token: token.token,
        id: authUser.id,
        first_name,
        last_name,
        email,
        phone_number,
        device_id,
        device_type,
        referrer_id,
        referral_code,
        customer_id,
        tier,
        password: null,
        phone_otp_verified: authUser.phone_otp_verified,
        email_otp_verified: authUser.email_otp_verified,
        pin: mask(authUser.pin),
        bvn: mask(authUser.bvn),
        // acquire_hash: createHmac('sha256', this.configService.get('ACQUIRE_SECRET')).update(email).digest('hex'),
      },
      'Sign In',
      'Sign in was successful',
    );
  }

  @Post('refresh-token')
  async refresh(@Body() refreshToken: RefreshTokenDto) {

    const oldToken = refreshToken.token

    // try {
    //   const payload = this.jwtService.verify(expiredToken)
    // } catch (e) {
    //   return error('Token Refresh', e.message);
    // }

    const payload = this.jwtService.decode(oldToken)
    const id = payload?.sub;
    if (!id) {
      return error('Token Refresh', 'You need to login again :)');
    }

    const user = await this.userService.findOne(id);
    if (!user) {
      return error('Token Refresh', 'You need to login again :)');
    }

    const authUser = await this.authService.login(user);
    
    return success(
      {
        ...authUser,
      },
      'Token Refresh',
      'Token refresh was successful',
    );
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async user(@GetUser() authUser: User) {
    const user = await this.userService.findOne(authUser.id);
    return success(
      {
        ...user,
        password: null,
        pin: mask(user.pin),
        bvn: mask(user.bvn),
        acquire_hash: createHmac('sha256', this.configService.get('ACQUIRE_SECRET')).update(user.email).digest('hex')
      },
      'User Profile',
      'User profile details',
    );
  }

  @Patch('profile')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async update(@Body() user: UpdateProfileDto, @GetUser() authUser: User) {
    await this.userService.update(authUser.id, {
      ...user,
    });
    const existingUser = await this.userService.findOne(authUser.id);
    return success(
      
      {
        ...existingUser,
        password: null,
        pin: mask(existingUser.pin),
        bvn: mask(existingUser.bvn),
      },
      'Users',
      'User details updated',
    );
  }

}
