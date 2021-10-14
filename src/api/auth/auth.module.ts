import { forwardRef, Module } from '@nestjs/common';
import { JwtStrategyService } from './jwt-strategy/jwt.service';
import { LocalStrategyService } from './local-strategy/local.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServicesModule } from '../../services';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: `${configService.get('JWT_EXPIRY')}s` },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
    ServicesModule,
  ],
  providers: [AuthService, LocalStrategyService, JwtStrategyService],
  exports: [AuthService, JwtModule],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}
