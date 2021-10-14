import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
  // orderBy: {
  //   email: 'ASC',
  // },
})
@Unique(['id'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'customer_id', nullable: true, length: 26 })
  customer_id?: string;

  @Column('varchar', { name: 'gender', nullable: true, length: 26 })
  gender?: string;

  @Column('int', { name: 'no_of_children', nullable: true, width: 2 })
  no_of_children?: number;

  @Column('varchar', { name: 'home_address', nullable: true, length: 255 })
  home_address?: string;

  @Column('varchar', {
    name: 'state_of_residence',
    nullable: true,
    length: 100,
  })
  state_of_residence?: string;

  @Column('int', { name: 'payday', nullable: true, width: 2 })
  payday?: number;

  @Column('decimal', {
    name: 'net_income',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  net_income?: number;

  @Column('date', { name: 'date_of_birth', nullable: true })
  date_of_birth?: Date | string;

  @Column('date', { name: 'date_of_employment', nullable: true })
  date_of_employment?: Date | string;

  @Column('decimal', {
    name: 'monthly_income',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  monthly_income?: number;

  @Column('varchar', { name: 'image', nullable: true, length: 255, transformer: {
    to: (value: string) => value,
    from: (value: string) => value ? `${process.env.PROFILE_BASE_URL}/${value}` : value,
  } })
  image?: string;

  @Column('varchar', { name: 'document', nullable: true, length: 255, transformer: {
    to: (value: string) => value,
    from: (value: string) => value ? `${process.env.DOCUMENT_BASE_URL}/${value}` : value,
  } })
  document?: string;

  @Column('tinyint', { name: 'document_state', nullable: true, width: 1 })
  document_state?: boolean;

  @Column('varchar', { name: 'employer', nullable: true, length: 100 })
  employer?: string;

  @Column('varchar', { name: 'employer_address', nullable: true, length: 255 })
  employer_address?: string;

  @Column('varchar', { name: 'employer_state', nullable: true, length: 100 })
  employer_state?: string;

  @Column('varchar', { name: 'next_of_kin_title', nullable: true, length: 26 })
  next_of_kin_title?: string;

  @Column('varchar', { name: 'next_of_kin_name', nullable: true, length: 52 })
  next_of_kin_name?: string;

  @Column('varchar', {
    name: 'next_of_kin_relationship',
    nullable: true,
    length: 26,
  })
  next_of_kin_relationship?: string;

  @Column('varchar', {
    name: 'next_of_kin_address',
    nullable: true,
    length: 255,
  })
  next_of_kin_address?: string;

  @Column('varchar', {
    name: 'next_of_kin_state',
    nullable: true,
    length: 100,
  })
  next_of_kin_state?: string;

  @Column('varchar', { name: 'first_name', nullable: true, length: 52 })
  first_name?: string;

  @Column('varchar', { name: 'last_name', nullable: true, length: 52 })
  last_name?: string;

  @Column('varchar', { name: 'email', nullable: true, length: 52 })
  email?: string;

  @Column('varchar', { name: 'external_email', nullable: true, length: 52 })
  external_email?: string;

  @Column('tinyint', { name: 'email_valid', nullable: true, width: 1 })
  email_valid?: boolean;

  @Column('varchar', { name: 'password', length: 60 })
  password: string;

  @Column('varchar', { name: 'phone_number', nullable: true, length: 26 })
  phone_number?: string;

  @Column('varchar', { name: 'bvn', nullable: true, length: 11 })
  bvn?: string;

  @Column('tinyint', { name: 'bvn_valid', nullable: true, width: 1 })
  bvn_valid?: boolean;

  @Column('varchar', { name: 'marital_status', nullable: true, length: 26 })
  marital_status?: string;

  @Column('varchar', { name: 'company_name', nullable: true, length: 100 })
  company_name?: string;

  @Column('varchar', { name: 'next_of_kin_phone', nullable: true, length: 26 })
  next_of_kin_phone?: string;

  @Column('varchar', { name: 'category', nullable: true, length: 26 })
  category?: string;

  @Column('char', { name: 'referrer_id', nullable: true, length: 36 })
  referrer_id?: string;

  @Column('varchar', { name: 'pin', nullable: true, length: 60 })
  pin?: string;

  @Column('tinyint', { name: 'phone_otp_verified', nullable: true, width: 1 })
  phone_otp_verified?: boolean;

  @Column('tinyint', { name: 'email_otp_verified', nullable: true, width: 1 })
  email_otp_verified?: boolean;

  @Column('tinyint', { name: 'bvn_otp_verified', nullable: true, width: 1 })
  bvn_otp_verified?: boolean;

  @Column('varchar', { name: 'bvn_phone_number', nullable: true, length: 26 })
  bvn_phone_number?: string;

  @Column('int', { name: 'tier', nullable: true, width: 2 })
  tier?: number;

  @Column('tinyint', { name: 'enabled', nullable: true, width: 1 })
  enabled?: boolean;

  @Column('tinyint', { name: 'is_user_banned', nullable: true, width: 1 })
  is_user_banned?: boolean;

  @Column('tinyint', { name: 'fraudulent', nullable: true, width: 1 })
  fraudulent?: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updated_at?: Date;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deleted_at?: Date;

  @Column('timestamp', { name: 'last_activity', nullable: true })
  last_activity?: Date;

  @Column('tinyint', { name: 'wallet_available', nullable: true, width: 1 })
  wallet_available?: boolean;

  @Column('varchar', { name: 'type_of_employment', nullable: true, length: 26 })
  type_of_employment?: string;

  @Column('varchar', { name: 'industry', nullable: true, length: 100 })
  industry?: string;

  @Column('varchar', { name: 'device_type', nullable: true, length: 26 })
  device_type?: string;

  @Column('varchar', { name: 'device_id', nullable: true, length: 255 })
  device_id?: string;

  @Column('varchar', { name: 'gcm_device_token', nullable: true, length: 255 })
  gcm_device_token?: string;

  @Column('varchar', { name: 'referral_code', nullable: true, length: 26 })
  referral_code?: string;

  @Column('varchar', { name: 'language', nullable: true, length: 6 })
  language?: string;

  @Column('varchar', { name: 'source', nullable: true, length: 26 })
  source?: string;

  @Column('varchar', { name: 'merchant_id', nullable: true, length: 36 })
  merchant_id?: string;

  @Column('datetime', { name: 'suspended_at', nullable: true })
  suspended_at?: Date;

  @Column('datetime', { name: 'closed_at', nullable: true })
  closed_at?: Date;

}
