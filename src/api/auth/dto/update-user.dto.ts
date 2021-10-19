import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';
import { titleCase } from '../../../utils';
import { date } from '../../../utils/time.utils';
import { IsName } from '../../../utils/validation.util';

export class UpdateProfileDto {
  
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

export class LoginUserDto {
  @IsEmail()
  @Length(1, 52)
  @ApiProperty()
  email: string;

  @IsString()
  @Length(1, 26)
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiPropertyOptional()
  device_id?: string;

  @IsOptional()
  @IsString()
  @Length(1, 26)
  @ApiPropertyOptional()
  device_type?: string;

  // @IsOptional()
  // @IsString()
  // @Length(1, 255)
  // @ApiPropertyOptional()
  // gcm_device_token?: string;

}
export class RefreshTokenDto {

  @IsString()
  @ApiProperty()
  token: string;

}

export class InitiateEmailDto {
  @IsEmail()
  @Length(1, 52)
  @ApiProperty()
  email: string;
}
export class UpdateEmailDto {

  @IsEmail()
  @Length(1, 52)
  @ApiProperty()
  old_email: string;

  @IsEmail()
  @Length(1, 52)
  @ApiProperty()
  new_email: string;

  @IsNumberString()
  @Length(1, 6)
  @ApiProperty()
  otp: string;

  @IsOptional()
  @IsNumberString()
  @Length(1, 4)
  @ApiPropertyOptional()
  pin?: string;

}

export class UpdateReferralCodeDto {
  @IsString()
  @Length(1, 6)
  @ApiProperty()
  referral_code: string;
}

export class InitiatePhoneNumberDto {
  @IsNumberString()
  @Length(1, 11)
  @ApiProperty()
  phone_number: string;
}
export class UpdatePhoneNumberDto {

  @IsNumberString()
  @Length(1, 11)
  @ApiProperty()
  old_phone_number: string;

  @IsNumberString()
  @Length(1, 11)
  @ApiProperty()
  new_phone_number: string;

  @IsNumberString()
  @Length(1, 6)
  @ApiProperty()
  otp: string;

  @IsOptional()
  @IsNumberString()
  @Length(1, 4)
  @ApiPropertyOptional()
  pin?: string;

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

  @Transform(({ value }) => {
    console.log('date_of_birth', value)
    const dateArr = (value as string)?.split(' ')
    return dateArr && dateArr.length > 0 ? date(dateArr[0], 'YYYY-MM-DD') : null
  })
  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  date_of_birth?: string;
}

export class UpdateBvnDto {
  @IsNumberString()
  @Length(11, 11)
  @ApiProperty()
  bvn: string;

  @Transform(({ value }) => {
    console.log('date_of_birth', value)
    const dateArr = (value as string)?.split(' ')
    return dateArr && dateArr.length > 0 ? date(dateArr[0], 'YYYY-MM-DD') : null
  })
  @IsDateString()
  @ApiProperty()
  date_of_birth: string;

  @IsNumberString()
  @Length(1, 6)
  @ApiProperty()
  otp: string;
}

export class InitiateByServiceBvnDto {
  @IsNumberString()
  @Length(11, 11)
  @ApiProperty()
  bvn: string;

  @IsString()
  @Length(1, 52)
  @ApiProperty()
  email_or_phone_number: string;

  @IsOptional()
  @IsName()
  @ApiPropertyOptional()
  first_name?: string;

  @IsOptional()
  @IsName()
  @ApiPropertyOptional()
  last_name?: string;
}

export class UpdateByServiceBvnDto {
  @IsNumberString()
  @Length(11, 11)
  @ApiProperty()
  bvn: string;

  @IsString()
  @Length(1, 52)
  @ApiProperty()
  email_or_phone_number: string;

  @IsNumberString()
  @Length(1, 6)
  @ApiProperty()
  otp: string;
}


export class UpdateProfileByServiceDto {
  
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  user_id?: string;
  
  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional()
  merchant_id?: string;

  @IsOptional()
  @IsString()
  @IsName()
  @Length(1, 52)
  @ApiPropertyOptional()
  first_name?: string;

  @IsOptional()
  @IsString()
  @IsName()
  @Length(1, 52)
  @ApiPropertyOptional()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 52)
  @ApiPropertyOptional()
  email?: string;

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

export class VerifyBvnDataDto {

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsString()
  @Length(11, 11)
  @ApiPropertyOptional()
  bvn?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  photo?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  watchListed?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  responseCode?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  middleName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  phoneNumber2?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  enrollmentBank?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  enrollmentBranch?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  gender?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  levelOfAccount?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  lgaOfOrigin?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  lgaOfResidence?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  stateOfOrigin?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  stateOfResidence?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  maritalStatus?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  nin?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  nameOnCard?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  nationality?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  residentialAddress?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  registrationDate?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  similarity?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  image_validity?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  image_processed?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  createdAt?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  updatedAt?: string;
}

export class VerifyBvnDto {

  @Transform(({ value }) => value.toLowerCase())
  @IsIn(['success', 'error'])
  @ApiProperty()
  status: string;

  @IsString()
  @Length(0, 255)
  @ApiProperty()
  message: string;

  @ValidateNested()
  @Type(() => VerifyBvnDataDto)
  @ApiProperty()
  data: VerifyBvnDataDto;
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

export class UssdAtSessionDto {

  @IsString()
  @ApiProperty()
  sessionId: string;

  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  networkCode: string;

  @IsString()
  @ApiProperty()
  serviceCode: string;

  @IsString()
  @ApiProperty()
  text: string;
  
}

export class UssdAtEventDto {

  @IsString()
  @ApiProperty()
  date: string;

  @IsString()
  @ApiProperty()
  sessionId: string;

  @IsString()
  @ApiProperty()
  serviceCode: string;
  
  @IsString()
  @ApiProperty()
  networkCode: string;

  @IsString()
  @ApiProperty()
  phoneNumber: string;

  @IsString()
  @ApiProperty()
  status: string;

  @IsString()
  @ApiProperty()
  cost: string;

  @IsString()
  @ApiProperty()
  durationInMillis: string;

  @IsString()
  @ApiProperty()
  hopsCount: string;

  @IsString()
  @ApiProperty()
  input: string;

  @IsString()
  @ApiProperty()
  lastAppResponse: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  errorMessage?: string;

}

export class UnlinkDeviceDto {

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  imei?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  unique_android_code?: string;
 
}

export class ZendeskJwtAuthDto {

  @IsString()
  @ApiProperty()
  user_token: string;

}

export class AcquireAuthDto {

  @IsEmail()
  @ApiProperty()
  email: string;

}
export class AccountDto {

  @IsString()
  @Length(1, 36)
  @ApiProperty()
  merchant_id: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNumberString()
  @Length(1, 11)
  @ApiProperty()
  phone_number: string;

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

}