import { plainToClass } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, Length, validateSync } from 'class-validator';

class EnvironmentVariables {

  @IsString()
  BASE_PATH: string

  @IsString()
  SERVICE_NAME: string

  @IsString()
  SERVICE_URL: string

  @IsNumber()
  PORT: number
  
  @IsIn([
    'development',
    'staging',
    'simulate',
    'production',
  ])
  NODE_ENV: string

  @IsString()
  DB_DIALECT: string

  @IsString()
  DB_NAME: string

  @IsBoolean()
  DB_SYNC: boolean

  @IsBoolean()
  DB_LOG: boolean

  @IsNumber()
  THROTTLE_TTL: number

  @IsNumber()
  THROTTLE_LIMIT: number

  @IsNumber()
  HTTP_TIMEOUT: number

  @IsNumber()
  HTTP_MAX_REDIRECTS: number

  @IsString()
  JWT_SECRET: string

  @IsNumber()
  JWT_EXPIRY: number

  @IsString()
  @Length(32, 32)
  ENCRYPTION_KEY: string

  @IsString()
  AWS_S3_KEY: string

  @IsString()
  AWS_S3_SECRET_KEY: string

  @IsString()
  AWS_S3_BUCKET: string

  @IsString()
  AWS_S3_DIR: string

  @IsString()
  AWS_S3_DIR_STAGE: string

  @IsString()
  AWS_S3_REGION: string

  @IsNumber()
  OTP_EXPIRY_DURATION: number

  @IsString()
  SENTRY_DNS: string

  @IsString()
  RUDDERSTACK_SOURCE_ID: string

  @IsString()
  RUDDERSTACK_WRITE_KEY: string

  @IsString()
  RUDDERSTACK_TOKEN: string

  @IsString()
  RUDDERSTACK_DATA_PLANE_URL: string

  @IsString()
  NEVER_BOUNCE_API_KEY: string

  @IsString()
  REDIS_HOST: string

  @IsNumber()
  REDIS_PORT: number

  @IsString()
  REDIS_PASS: string

  @IsNumber()
  REDIS_DB: number

  @IsString()
  I18N_LANG: string

  @IsString()
  I18N_SOURCE: string

  @IsString()
  ELIGIBILITY_BASE_URL: string

  @IsString()
  TRANSFER_BASE_URL: string

  @IsString()
  LOAN_BASE_URL: string

  @IsString()
  WALLET_INTEREST_BASE_URL: string

  @IsString()
  MARKETPLACE_BASE_URL: string

  @IsString()
  CARD_BASE_URL: string

  @IsString()
  ACCOUNT_GENERATION_BASE_URL: string

  @IsString()
  WALLET_BASE_URL: string

  @IsString()
  DOCUMENT_BASE_URL: string

  @IsString()
  BVN_URL: string

  @IsString()
  PWA_BASE_URL: string

  @IsOptional()
  @IsIn([
    'on',
    'off',
  ])
  
  @IsOptional()
  @IsIn([
    'on',
    'off',
  ])
  SHUTDOWN_SWITCH?: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
