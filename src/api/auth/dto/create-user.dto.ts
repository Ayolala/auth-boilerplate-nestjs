import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { titleCase } from '../../../utils';
import { IsName } from '../../../utils/validation.util';

export class RegisterUserDto {
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
  @Transform(({ value }) => titleCase(value))
  @ApiPropertyOptional()
  gender?: string;

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

export class RegisterByServiceUserDto {
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

  @IsOptional()
  @IsNumberString()
  @Length(11, 11)
  @ApiPropertyOptional()
  bvn?: string;
  
  @IsOptional()
  @IsString()
  @Length(1, 26)
  @ApiPropertyOptional()
  password?: string;

  @IsNumberString()
  @Length(1, 11)
  @ApiProperty()
  phone_number: string;

  @IsOptional()
  @Transform(({ value }) => titleCase(value))
  @ApiPropertyOptional()
  gender?: string;
  
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

  @IsOptional()
  @IsString()
  @Length(1, 36)
  @ApiPropertyOptional()
  merchant_id?: string;

}
