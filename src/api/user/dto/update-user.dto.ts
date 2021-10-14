import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { titleCase } from '../../../utils';
import { date } from '../../../utils/time.utils';
import { IsName } from '../../../utils/validation.util';

export class UpdateUserDto {
  
  @IsOptional()
  @IsNumberString()
  @Length(1, 11)
  @ApiPropertyOptional()
  phone_number?: string;
  
  @IsOptional()
  @Transform(({ value }) => titleCase(value))
  @ApiPropertyOptional()
  gender?: string;

  @IsOptional()
  @Transform(({ value }) => titleCase(value))
  @ApiPropertyOptional()
  type_of_employment?: string;

  @IsOptional()
  @IsString()
  @Length(1, 52)
  @ApiPropertyOptional()
  industry?: string;

  @IsOptional()
  @Transform(({ value }) => titleCase(value))
  @ApiPropertyOptional()
  marital_status?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  no_of_children?: number;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiPropertyOptional()
  home_address?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @ApiPropertyOptional()
  state_of_residence?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  payday?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  net_income?: number;

  @Transform(({ value }) => {
    console.log('date_of_birth', value)
    const dateArr = (value as string)?.split(' ')
    return dateArr && dateArr.length > 0 ? date(dateArr[0], 'YYYY-MM-DD') : null
  })
  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  date_of_birth?: string;

  @Transform(({ value }) => {
    console.log('date_of_employment', value)
    const dateArr = (value as string)?.split(' ')
    return dateArr && dateArr.length > 0 ? date(dateArr[0], 'YYYY-MM-DD') : null
  })
  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  date_of_employment?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  monthly_income?: number;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @ApiPropertyOptional()
  employer?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiPropertyOptional()
  employer_address?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @ApiPropertyOptional()
  employer_state?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @ApiPropertyOptional()
  company_name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 26)
  @ApiPropertyOptional()
  next_of_kin_title?: string;

  @IsOptional()
  @IsString()
  @IsName()
  @Length(1, 52)
  @ApiPropertyOptional()
  next_of_kin_name?: string;

  @IsOptional()
  @Transform(({ value }) => titleCase(value))
  @ApiPropertyOptional()
  next_of_kin_relationship?: string;

  @IsOptional()
  @IsString()
  @Length(1, 11)
  @ApiPropertyOptional()
  next_of_kin_phone?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiPropertyOptional()
  next_of_kin_address?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @ApiPropertyOptional()
  next_of_kin_state?: string;

  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  @IsIn(['en', 'pg', 'yr', 'hs', 'ig'])
  @ApiPropertyOptional()
  language?: string;

}

export class UpdateEmailDto {
  @IsEmail()
  @Length(1, 52)
  @ApiProperty()
  email: string;
}

export class UpdateReferralCodeDto {
  @IsString()
  @Length(1, 6)
  @ApiProperty()
  referral_code: string;
}

export class UpdatePhoneNumberDto {
  @IsNumberString()
  @Length(1, 11)
  @ApiProperty()
  phone_number: string;
}

export class CreatePinDto {
  @IsNumberString()
  @Length(1, 4)
  @ApiProperty()
  pin: string;
}

export class ChangePinDto {
  @IsNumberString()
  @Length(1, 4)
  @ApiProperty()
  current_pin: string;

  @IsNumberString()
  @Length(1, 4)
  @ApiProperty()
  new_pin: string;

  @IsNumberString()
  @Length(1, 4)
  @ApiProperty()
  confirm_new_pin: string;
}

export class InitiatePinDto {
  @Transform(({ value }) => {
    console.log('date_of_birth', value)
    const dateArr = (value as string)?.split(' ')
    return dateArr && dateArr.length > 0 ? date(dateArr[0], 'YYYY-MM-DD') : null
  })
  @IsDateString()
  @ApiProperty()
  date_of_birth: string;

  @IsNumberString()
  @Length(11, 11)
  @ApiProperty()
  bvn: string;
}

export class UpdatePinDto {
  @IsNumberString()
  @Length(1, 4)
  @ApiProperty()
  pin: string;

  @IsNumberString()
  @Length(1, 6)
  @ApiProperty()
  otp: string;
}

export class InitiateBvnDto {
  @IsNumberString()
  @Length(11, 11)
  @ApiProperty()
  bvn: string;
}

export class UpdateBvnDto {
  @IsNumberString()
  @Length(11, 11)
  @ApiProperty()
  bvn: string;

  @IsNumberString()
  @Length(1, 6)
  @ApiProperty()
  otp: string;
}

export class VerifyBvnDataDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsNumberString()
  @Length(11, 11)
  @ApiProperty()
  bvn: string;

  @IsString()
  @ApiProperty()
  photo: string;

  @IsString()
  @ApiProperty()
  watchListed: string;

  @IsNumberString()
  @ApiProperty()
  responseCode: string;

  @IsString()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  last_name: string;

  @IsString()
  @ApiProperty()
  middleName: string;

  @Transform(({ value }) => {
    console.log('date_of_birth', value)
    const dateArr = (value as string)?.split(' ')
    return dateArr && dateArr.length > 0 ? date(dateArr[0], 'YYYY-MM-DD') : null
  })
  @IsDateString()
  @ApiProperty()
  date_of_birth: string;

  @IsNumberString()
  @ApiProperty()
  phone_number: string;

  @IsNumberString()
  @ApiProperty()
  phone_number2: string;

  @IsString()
  @ApiProperty()
  enrollmentBank: string;

  @IsString()
  @ApiProperty()
  enrollmentBranch: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  gender: string;

  @IsString()
  @ApiProperty()
  levelOfAccount: string;

  @IsString()
  @ApiProperty()
  lgaOfOrigin: string;

  @IsString()
  @ApiProperty()
  lgaOfResidence: string;

  @IsString()
  @ApiProperty()
  stateOfOrigin: string;

  @IsString()
  @ApiProperty()
  stateOfResidence: string;

  @IsString()
  @ApiProperty()
  maritalStatus: string;

  @IsNumberString()
  @ApiProperty()
  nin: string;

  @IsString()
  @ApiProperty()
  nameOnCard: string;

  @IsString()
  @ApiProperty()
  nationality: string;

  @IsString()
  @ApiProperty()
  residentialAddress: string;

  @IsDateString()
  @ApiProperty()
  registrationDate: string;

  @IsString()
  @ApiProperty()
  similarity: string;

  @IsString()
  @ApiProperty()
  image_validity: string;

  @IsString()
  @ApiProperty()
  image_processed: string;

  @IsDateString()
  @ApiProperty()
  created_at: string;

  @IsDateString()
  @ApiProperty()
  updated_at: string;
}

export class ChangeResetPasswordDto {
  @IsString()
  @Length(1, 26)
  @ApiProperty()
  current_password: string;

  @IsString()
  @Length(1, 26)
  @ApiProperty()
  new_password: string;

  @IsString()
  @Length(1, 26)
  @ApiProperty()
  confirm_new_password: string;
}

export class InitiateResetPasswordDto {
  @IsString()
  @Length(1, 52)
  @ApiProperty()
  email_or_phone_number: string;

  // @IsNumberString()
  // @Length(11, 11)
  // @ApiProperty()
  // bvn: string;
}

export class UpdateResetPasswordDto {
  @IsString()
  @Length(1, 52)
  @ApiProperty()
  email_or_phone_number: string;

  @IsString()
  @Length(1, 26)
  @ApiProperty()
  new_password: string;

  @IsString()
  @Length(1, 26)
  @ApiProperty()
  confirm_new_password: string;

  @IsNumberString()
  @Length(1, 6)
  @ApiProperty()
  otp: string;
}

export class FindUserDto {
  @IsOptional()
  @Transform(({ value }) => '' + value)
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @Length(1, 8)
  @ApiPropertyOptional()
  customer_id?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 52)
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 52)
  @ApiPropertyOptional()
  external_email?: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class MessageDto {

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  message?: any;

}
