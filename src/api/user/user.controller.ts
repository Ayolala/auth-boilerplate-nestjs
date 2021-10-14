import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  forwardRef,
  Inject,
  Query,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt-strategy/jwt.guard';
import { GetUser } from '../../decorators';
import {
  error,
  Event,
  makeFilter,
  mask,
  success,
  trimUser,
  unifyPhoneNumber,
} from '../../utils';
import { UserService } from './user.service';
import {
  FileUploadDto,
  FindUserDto,
  MessageDto,
  UpdateEmailDto,
  UpdatePhoneNumberDto,
  UpdateReferralCodeDto,
  UpdateUserDto,
} from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { MultipartFile } from 'fastify-multipart';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { IsNull, Like, Not } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('admin/user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto as any);
    return success(user, 'New USER', 'A new user has been successfully saved');
  }

  @Get('search')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async search(
    @Query('query') query?: string,
    @Query('per_page') perPage: number = 12,
  ) {
    const users = await this.userService.userRepository.find({
      where: [
        'first_name',
        'last_name',
        'phone_number',
        'email',
        'bvn',
        'customer_id',
      ].map((column) => ({ [column]: Like(`%${query}%`) })),
      skip: 0,
      take: perPage,
    });
    const total = users.length
    return success(
      users.map((user) => {
        return {
          ...user,
          password: null,
          pin: mask(user.pin),
          bvn: mask(user.bvn),
        };
      }),
      'Users',
      'Users list',
      {
        current_page: 1,
        next_page: null,
        prev_page: null,
        per_page: total,
        total,
      }
    );
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findAll(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 12,
    @Query('query') query?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const _page = page < 1 ? 1 : page
    const _nextPage = _page + 1
    const _prevPage = _page - 1
    const _perPage = perPage
    const _filter = {
      take: perPage,
      skip: (page - 1) * perPage,
      where: makeFilter(query, from, to, [
        'first_name',
        'last_name',
        'phone_number',
        'email',
        'bvn',
        'customer_id',
      ]),
    }
    const total = await this.userService.userRepository.count(_filter);
    const users = await this.userService.userRepository.find(_filter);
    return success(
      users.map((user) => {
        return {
          ...user,
          password: null,
          pin: mask(user.pin),
          bvn: mask(user.bvn),
        };
      }),
      'Users',
      'Users list',
      {
        current_page: _page,
        next_page: _nextPage > total ? total : _nextPage,
        prev_page: _prevPage < 1 ? null : _prevPage,
        per_page: _perPage,
        total,
      }
    );
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return success(
      user ? {
        ...user,
        password: null,
        pin: mask(user.pin),
        bvn: mask(user.bvn),
      } : null,
      'Users',
      'User details',
    );
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    await this.userService.update(id, {
      ...user,
      ...(user?.phone_number ? { phone_number: unifyPhoneNumber(user.phone_number) } : {})
    });
    return success(
      {
        id,
      },
      'Users',
      'User details updated',
    );
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
@ApiBearerAuth()
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
    return success(
      {
        id,
      },
      'Users',
      'User deleted',
    );
  }

  @Get('metrics')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async metrics(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 12,
    @Query('query') query?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const users = await this.userService.userRepository.count({
      take: perPage,
      skip: (page - 1) * perPage,
      where: makeFilter(query, from, to, [
        'first_name',
        'last_name',
        'phone_number',
        'email',
        'bvn',
        'customer_id',
      ]),
    });
    return success({ users }, 'User Metrics', 'Collection of user metrics');
  }

  @Patch(':id/update-email')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async updateEmail(@Param('id') id: string, @Body() body: UpdateEmailDto) {
    const existingUser = await this.userService.findOne(id);

    if (existingUser.email_otp_verified) {
      return error(
        'Email Update',
        'You have a verified email already. You cannot update email.',
      );
    }

    const duplicateUser =
      await this.userService.userRepository.findOne({
        select: ['id', 'email'],
        where: [{ email: body.email }],
      }) ?? null;

    if (duplicateUser?.email) {
      return error('Email Update', 'Email address already exists');
    }

    await this.userService.update(id, {
      email: body.email,
    });

    this.eventEmitter.emit(Event.NEVER_BOUNCE_VERIFY, { user: { ...existingUser, email: body.email } });

    return success(body, 'Email Update', 'Email address successfully updated.');
  }

  @Patch(':id/update-phone-number')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async updatePhoneNumber(
    @Param('id') id: string,
    @Body() body: UpdatePhoneNumberDto,
  ) {
    const existingUser = await this.userService.findOne(id);

    if (existingUser.phone_otp_verified) {
      return error(
        'Phone Number Update',
        'You have a verified phone number already. You cannot update phone number.',
      );
    }

    const phone_number = unifyPhoneNumber(body.phone_number);
    const duplicateUser =
      await this.userService.userRepository.findOne({
        select: ['id', 'phone_number'],
        where: [{ phone_number }, { phone_number: body.phone_number }],
      }) ?? null;

    if (duplicateUser?.phone_number) {
      return error('Phone Number Update', 'Phone number already exists');
    }

    await this.userService.update(id, {
      phone_number,
    });

    return success(
      body,
      'Phone Number Update',
      'Phone Number address successfully updated.',
    );
  }

  @Patch(':id/suspend')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async suspend(@Param('id') id: string, @GetUser() authUser: User, @Body() body: MessageDto) {
    const { message } = body

    const existingUser = await this.userService.findOne(id);
    if (existingUser.closed_at !== null) {
      return error(
        'Account Status',
        'This account is currently being reviewed.',
      );
    }
    await this.userService.update(id, {
      suspended_at: new Date(),
    });

    this.eventEmitter.emit(Event.LOG_ACTIVITY, {
      action: 'Suspend',
      category: 'User',
      message: null,
      data: {
        message,
        id,
      },
      user: {
        id: authUser.id,
      },
    });

    return success(
      {
        id: id,
      },
      'Account Status',
      'This account has been placed under review.',
    );
  }

  @Patch(':id/unsuspend')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async unsuspend(@Param('id') id: string, @GetUser() authUser: User, @Body() body: MessageDto) {
    const { message } = body

    const existingUser = await this.userService.findOne(id);
    if (existingUser.suspended_at === null) {
      return error('Account Status', 'Your account is not suspended.');
    }
    await this.userService.update(id, {
      suspended_at: null,
    });

    this.eventEmitter.emit(Event.LOG_ACTIVITY, {
      action: 'Unsuspend',
      category: 'User',
      message: null,
      data: {
        message,
        id,
      },
      user: {
        id: authUser.id,
      },
    });

    return success(
      {
        id: id,
      },
      'Account Status',
      'Your account is now active.',
    );
  }

  @Patch(':id/close-account')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async closeAccount(@Param('id') id: string, @GetUser() authUser: User, @Body() body: MessageDto) {
    const { message } = body

    const existingUser = await this.userService.findOne(id);

    if (existingUser.closed_at !== null) {
      return error('Close Account', 'Your account is closed already.');
    }
    await this.userService.update(id, {
      closed_at: new Date(),
    });

    this.eventEmitter.emit(Event.LOG_ACTIVITY, {
      action: 'Close',
      category: 'User',
      message: null,
      data: {
        message,
        id,
      },
      user: {
        id: authUser.id,
      },
    });

    return success(
      {
        id: id,
      },
      'Account Status',
      'Your account has been closed',
    );
  }

  @Patch(':id/open-account')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async openAccount(@Param('id') id: string, @GetUser() authUser: User, @Body() body: MessageDto) {
    const { message } = body

    const existingUser = await this.userService.findOne(id);

    if (existingUser.closed_at === null) {
      return error('Open Account', 'Your account is not closed.');
    }
    await this.userService.update(id, {
      closed_at: null,
    });

    this.eventEmitter.emit(Event.LOG_ACTIVITY, {
      action: 'Open',
      category: 'User',
      message: null,
      data: {
        message,
        id,
      },
      user: {
        id: authUser.id,
      },
    });

    return success(
      {
        id: id,
      },
      'Account Status',
      'Your account is now active',
    );
  }


}
