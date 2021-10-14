import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsName } from '../../../utils/validation.util';

export class CreateUserDto {
  @IsString()
  @IsName()
  @Length(1, 52)
  @ApiProperty()
  first_name: string;

  @IsString()
  @IsName()
  @Length(1, 52)
  @ApiProperty()
  last_name: string;

  @IsEmail()
  @Length(1, 52)
  @ApiProperty()
  email: string;

  @IsString()
  @Length(1, 26)
  @ApiProperty()
  password: string;

  @IsNumberString()
  @Length(1, 11)
  @ApiProperty()
  phone_number: string;

  @IsOptional()
  @IsString()
  @Length(1, 6)
  @ApiPropertyOptional()
  referral_code?: string;
  
  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiPropertyOptional()
  device_id?: string;
  
  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiPropertyOptional()
  gcm_device_token?: string;

  @IsOptional()
  @IsString()
  @Length(1, 26)
  @ApiPropertyOptional()
  device_type?: string;

  @IsOptional()
  @IsString()
  @Length(1, 26)
  @ApiPropertyOptional()
  source?: string;
}
