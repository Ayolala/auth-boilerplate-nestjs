CREATE DATABASE kabani;

USE kabani;

CREATE TABLE settings (
    id varchar(36) NOT NULL,
    `key` varchar(52) NOT NULL,
    value varchar(255) NULL,
    created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deleted_at datetime(6) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY IDX_270373bda1755545971e856e59 (id)
); 

CREATE TABLE permission_types (
    id varchar(36) NOT NULL,
    name varchar(52) NOT NULL,
    display_name varchar(52) NOT NULL,
    description varchar(255) NULL,
    enabled tinyint DEFAULT NULL,
    created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deleted_at datetime(6) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY IDX_f3d13b077390be3b087e9593fa (id)
);

CREATE TABLE permissions (
    id varchar(36) NOT NULL,
    created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deleted_at datetime(6) DEFAULT NULL,
    type_id varchar(36) DEFAULT NULL,
    role_id varchar(36) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY IDX_2beaa266406ece902c3aa03ff2 (id)
);

CREATE TABLE roles (
    id varchar(36) NOT NULL,
    name varchar(52) NOT NULL,
    display_name varchar(52) NOT NULL,
    description varchar(255) NULL,
    enabled tinyint DEFAULT NULL,
    created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deleted_at datetime(6) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY IDX_ba206e3f2f25d9bacad1ba6638 (id)
);

CREATE TABLE `clients` (
  `id` varchar(36) NOT NULL,
  `action` varchar(52) DEFAULT NULL,
  `category` varchar(60) NOT NULL,
  `category_text` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_f1ab7cf3a5714dbc6bb4e1c28a` (`id`)
);

CREATE TABLE kabani.activities LIKE aella_money.audits;
INSERT kabani.activities SELECT * FROM aella_money.audits;

ALTER TABLE activities
    MODIFY COLUMN id CHAR(36) NOT NULL,
    MODIFY COLUMN user_id CHAR(36) NOT NULL,
    MODIFY COLUMN category VARCHAR(52) NOT NULL,
    MODIFY COLUMN category_text VARCHAR(255) NULL,
    MODIFY COLUMN action VARCHAR(52) NULL,
    MODIFY COLUMN data TEXT NOT NULL,
    MODIFY COLUMN created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY COLUMN updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    MODIFY COLUMN deleted_at datetime(6) DEFAULT NULL;

CREATE TABLE IF NOT EXISTS contacts (
    id varchar(36) NOT NULL,
    contact_user_id varchar(36) DEFAULT NULL,
    phone_number varchar(52) DEFAULT NULL,
    created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deleted_at datetime(6) DEFAULT NULL,
    user_id varchar(36) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY IDX_b99cd40cfd66a99f1571f4f72e (id)
);

CREATE TABLE IF NOT EXISTS fraud_types (
    id varchar(36) NOT NULL,
    type varchar(52) NOT NULL,
    message varchar(255) DEFAULT NULL,
    created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deleted_at datetime(6) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY IDX_8d355bdc782e4405e93835f8ba (id)
);

CREATE TABLE IF NOT EXISTS frauds (
    id varchar(36) NOT NULL,
    comment varchar(255) DEFAULT NULL,
    created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deleted_at datetime(6) DEFAULT NULL,
    user_id varchar(36) DEFAULT NULL,
    type_id varchar(36) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY IDX_dee0230cf07eb6ff615ae77043 (id)
);

CREATE TABLE IF NOT EXISTS otps (
    id varchar(36) NOT NULL,
    value varchar(6) NOT NULL,
    type varchar(26) NOT NULL,
    owner varchar(52) NOT NULL,
    used_at datetime DEFAULT NULL,
    expired_at datetime DEFAULT NULL,
    created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deleted_at datetime(6) DEFAULT NULL,
    user_id varchar(36) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY IDX_91fef5ed60605b854a2115d241 (id)
);

CREATE TABLE IF NOT EXISTS webhooks (
    id varchar(36) NOT NULL,
    name varchar(52) NOT NULL,
    description varchar(255) NULL,
    method varchar(26) NOT NULL,
    url varchar(255) NOT NULL,
    payload text NULL,
    headers text NULL,
    enabled tinyint(1) NOT NULL DEFAULT 1,
    created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deleted_at datetime(6) DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY IDX_91fef5ed60605b854a3226e352 (id)
);

CREATE TABLE `ussds` (
  `id` varchar(36) NOT NULL,
  `provider` varchar(26) NOT NULL,
  `type` varchar(26) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `phone_number` varchar(26) NOT NULL,
  `network_code` varchar(26) NOT NULL,
  `service_code` varchar(26) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `request` text,
  `response` text,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_80d4ef264331925ac4ec24d373` (`id`),
  KEY `IDX_48a590be690baa341245da7502` (`provider`),
  KEY `IDX_35c99c134855e429b8a6a1000f` (`type`),
  KEY `IDX_fc245d59b386d4e2f91cba8745` (`session_id`),
  KEY `IDX_cb7a6311059415d94fe496fece` (`phone_number`),
  KEY `IDX_34b20c2185e990cdea8ccd40a6` (`network_code`),
  KEY `IDX_448e2b20081a8a97a1f84f2d8a` (`service_code`)
);

CREATE TABLE kabani.users LIKE aella_money.users;
INSERT kabani.users SELECT * FROM aella_money.users;

ALTER TABLE users
    DROP COLUMN is_bvn_validated,
    DROP COLUMN is_card_linked,
    DROP COLUMN activated,
    DROP COLUMN activation,
    DROP COLUMN activation_code,
    DROP COLUMN gcm_device_token,
    -- DROP COLUMN pin,
    DROP COLUMN unlink_device_code,
    DROP COLUMN ios_token,
    DROP COLUMN remember_token,
    DROP COLUMN password_reset_code,
    DROP COLUMN password_reset_expiration,
    -- DROP COLUMN loan_push_notification,
    DROP COLUMN bank_name, 
    DROP COLUMN bank_account_no, 
    DROP COLUMN repayment_account,
    DROP COLUMN account_provider,
    DROP COLUMN type_id,
    DROP COLUMN account_number,
    DROP COLUMN email_confirmation,
    DROP COLUMN note_id,
    DROP COLUMN currency,
    DROP COLUMN country_code,
    DROP COLUMN note_external_email,
    DROP COLUMN account_state,
    DROP COLUMN image_processed,
    DROP COLUMN reason_for_fraud,
    DROP COLUMN date_of_fraud,
    DROP COLUMN pin_encoded, 
    DROP COLUMN okra_customer_id,
    DROP COLUMN okra_last_check,
    DROP COLUMN phone_otp,
    DROP COLUMN email_otp, 
    DROP COLUMN bvn_phone_otp,
    DROP COLUMN bvn_phone_otp_verified,
    DROP COLUMN team_apt_upd,
    DROP COLUMN repayment_account_bank_name,
    DROP COLUMN address;

ALTER TABLE users 
    ADD COLUMN bvn_otp_verified TINYINT(1) DEFAULT NULL,
    ADD COLUMN next_of_kin_state VARCHAR(100) DEFAULT NULL,
    ADD COLUMN role_id VARCHAR(36) DEFAULT NULL,
    ADD COLUMN device_id VARCHAR(255) NULL,
    ADD COLUMN gcm_device_token VARCHAR(255) NULL,
    ADD COLUMN referral_code VARCHAR(26) NULL,
    ADD COLUMN suspended_at DATETIME NULL,
    ADD COLUMN closed_at DATETIME NULL,
    ADD COLUMN type_of_employment VARCHAR(26) NULL,
    ADD COLUMN industry VARCHAR(100) NULL,
    ADD COLUMN source VARCHAR(26) DEFAULT NULL,
    ADD COLUMN merchant_id VARCHAR(36) DEFAULT NULL,
    ADD COLUMN language VARCHAR(6) DEFAULT 'en';

UPDATE users 
    SET date_of_birth = '1970-01-01' where date_of_birth = 0;

UPDATE users 
    SET last_activity = '1970-01-01' where last_activity = 0;

UPDATE users 
    SET email_valid = 'EMPTY' where email_valid = '';

ALTER TABLE users
    MODIFY COLUMN email_valid VARCHAR(100) NULL,
    MODIFY COLUMN date_of_birth DATE NULL,
    MODIFY COLUMN last_activity DATE NULL;

UPDATE users 
    SET date_of_birth = NULL where date_of_birth = '1970-01-01';

UPDATE users 
    SET last_activity = NULL where last_activity = '1970-01-01';

UPDATE users 
    SET email_valid = NULL where email_valid = 'EMPTY';

ALTER TABLE users
    MODIFY COLUMN id CHAR(36) NOT NULL,
    MODIFY COLUMN customer_id VARCHAR(26) NULL,
    MODIFY COLUMN gender VARCHAR(26) NULL,
    MODIFY COLUMN image VARCHAR(255) NULL,
    MODIFY COLUMN next_of_kin_title VARCHAR(26) NULL,
    MODIFY COLUMN next_of_kin_name VARCHAR(52) NULL,
    MODIFY COLUMN next_of_kin_relationship VARCHAR(26) NULL,
    MODIFY COLUMN next_of_kin_phone VARCHAR(26) NULL,
    MODIFY COLUMN category VARCHAR(26) NULL,
    MODIFY COLUMN bvn_phone_number VARCHAR(26) NULL,
    MODIFY COLUMN tier INT(2) NULL,
    MODIFY COLUMN payday INT(2) NULL,
    MODIFY COLUMN transaction_pin VARCHAR(60) NULL,
    MODIFY COLUMN first_name VARCHAR(52) NULL,
    MODIFY COLUMN last_name VARCHAR(52) NULL,
    MODIFY COLUMN phone_number VARCHAR(26) NULL,
    MODIFY COLUMN marital_status VARCHAR(26) NULL,
    MODIFY COLUMN company_name VARCHAR(100) NULL,
    MODIFY COLUMN bvn VARCHAR(26) NULL,
    MODIFY COLUMN email VARCHAR(52) NULL,
    MODIFY COLUMN external_email VARCHAR(52) NULL,
    MODIFY COLUMN email_valid TINYINT(1) NULL,
    MODIFY COLUMN bvn_valid TINYINT(1) NULL,
    MODIFY COLUMN fraudulent TINYINT(1) NULL,
    MODIFY COLUMN referee CHAR(36) NULL,
    MODIFY COLUMN no_of_children INT(2) NULL,
    MODIFY COLUMN date_of_birth DATETIME NULL DEFAULT '1970-01-01 00:00:00',
    MODIFY COLUMN last_activity DATETIME NULL DEFAULT '1970-01-01 00:00:00',
    MODIFY COLUMN net_income DECIMAL(18,4) NULL,
    MODIFY COLUMN monthly_income DECIMAL(18,4) NULL,
    MODIFY COLUMN created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY COLUMN updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    MODIFY COLUMN deleted_at datetime(6) DEFAULT NULL;

-- ALTER TABLE users
--     RENAME COLUMN referee TO referrer_id,
--     RENAME COLUMN transaction_pin TO pin,
--     RENAME COLUMN platform TO device_type;

ALTER TABLE users CHANGE referee referrer_id CHAR(36);

ALTER TABLE users CHANGE transaction_pin pin VARCHAR(60);

ALTER TABLE users CHANGE platform device_type VARCHAR(100);

INSERT INTO 
    settings (id, `key`, value) 
VALUES
    ('8538b644-9c19-4b56-adc4-f50d3a2f8f97', 'face_detect', 'amazon'),
    ('c4e974a5-1ab5-4a11-b6ad-09aa1a0f0119', 'urgent_information', NULL),
    ('0c0da255-f59b-4382-8b0f-2a2812a2ad03', 'current_android_version', '54'),
    ('67013877-5329-49cf-99ad-42e80e7d38ae', 'current_ios_version', '1'),
    ('fa0bb93c-6465-4ce0-bb0c-258e5e15357e', 'benchmark_version_android', '112'),
    ('cc16ad0c-fa3f-41e2-a2e2-03b2335ade78', 'benchmark_version_ios', NULL),
    ('677fdb55-c409-43da-82b2-c1c862088879', 'benchmark_version_android_code', '112'),
    ('648f425f-d081-405e-8b5b-5e5409f388b5', 'benchmark_version_ios_code', '0'),
    ('b9b59ac1-40b8-4cfd-ae2f-239c8d2a62e0', 'overall_auto_disburse', '1'),
    ('7c0bd0fb-160e-43bc-9b06-0eb9903bfb94', 'min_investment_in_naira', '2300'),
    ('aa3fb558-ff96-486f-a433-2a0e9116ab76', 'max_investment_in_naira', '2300'),
    ('7c4b5f93-0f21-4fe5-bfb8-11a521cc3164', 'min_investment_tenor', NULL),
    ('7d126ea6-089e-4916-9637-9a376ab53736', 'max_investment_tenor', NULL),
    ('aa3dcfc1-5b87-414d-bdb9-27d864f00079', 'percent_tax_on_investment_return', '10'),
    ('08e2bf50-f098-43e5-94f0-f6cdcf91b76e', 'investor_interest_rate_in_percent', '20'),
    ('2ef65f54-d918-41e5-b2d3-046dfafb3110', 'auto_disburse', '1'),
    ('7c367a9a-207c-46ad-956c-b55399e6113b', 'disburse_from', '1'),
    ('031514b4-f22e-430e-a6a9-cc84d03e6b9e', 'bvn_validation', '1'),
    ('ea779b8a-6187-48eb-809a-5cfd7ad6c48a', 'bvn_validation_portal', '2'),
    ('abb7301b-3552-42ba-bcc3-8ccc6b0d3bc8', 'email_validation', '1'),
    ('90be4ba7-401a-49f9-9626-30a0a76b9a26', 'validate_bvn_double_occurrence', '0'),
    ('eb3c6819-d14e-4958-918b-a0b0fb55a482', 'first_timer_interest', '0.27'),
    ('1e09404a-3b1a-4bed-b0be-500f4ba0cf19', 'fbid', '0'),
    ('f5a36c6c-241f-4871-88e1-87a86511fa41', 'auth_info', '[{\"name\": \"Aella Financial Solutions Limited\", \"bank\": \"Heritage Bank\",\"number\": \"5100206005\"}]'),
    ('2c6899ff-76b8-43dc-8828-d5300f3c92d3', 'percent_default_charge', NULL),
    ('fc124212-2000-4ae7-bcee-f1d1464f066e', 'naira_to_dollar', '349.00'),
    ('7ff92044-d4bd-41a1-8905-538900de2555', 'naira_to_dollar_adjustment', '369'),
    ('dd786b7c-e887-4783-baed-7da8d8a3be84', 'currency_adjustment', '20'),
    ('44151359-450e-4360-8681-9a3fb3325330', 's3_upload_username', NULL),
    ('825c03b3-7ccf-4185-9b39-1949380067a7', 's3_upload_password', NULL),
    ('ea9d32f8-92f8-4831-b350-0e0343a215ef', 'flutter_wave_live', 0),
    ('ecf74a0c-8af1-4a57-bffc-635a55121dce', 'paystack_live', 0),
    ('efa8e2c6-f6df-4c88-a1d6-61d5d163385b', 'paystack_public_key_test', 'pk_test_5a2acddd1fcce9878df76ebb5d85fb099895ff4b'),
    ('2feb596b-a9aa-4a50-86f9-47424336b919', 'paystack_public_key_live', NULL),
    ('a9800048-3682-42a3-8c81-f51cf90acf57', 'paystack_test_secret_key', NULL),
    ('e5512d43-3b36-4748-af46-f5db788a6d50', 'paystack_test_public_key', 'pk_test_5a2acddd1fcce9878df76ebb5d85fb099895ff4b'),
    ('bff50190-d100-4d88-9a24-021be07fe02c', 'paystack_live_secret_key', NULL),
    ('07041dad-8db3-4eaa-b731-3a1dfbcf9ed4', 'paystack_live_public_key', NULL),
    ('cb089d00-64bb-4747-9479-56e74c2569d6', 'rek_ID', 'AKIAIPAL3K7IWRP23UOQ'),
    ('3557593f-1dcb-4f97-a776-5c4a9de763a2', 'rek_key', 'dwSfr6DDChK4dwsb7betF1gEngapVcSUc+tcN30v'),
    ('7f3486a0-bdc1-47af-b010-f3e39faad4f5', 'secure_key', 'st_81d19b2971e92184bac4792ffb9eedf7'),
    ('bc6311be-aec1-4a3a-838e-ace5b30a9d15', 'auto_debit_default', '0'),
    ('93344ef0-5b8b-4443-b7d7-4273fb13fdcf', 'auto_debit_npl', '0'),
    ('a08b92c5-d344-11eb-a46c-026f410a6142', 'pin_required_for_bills', true),
    ('3d40fa39-d344-11eb-a46c-026f410a6142', 'min_amount_for_bills_pin', 1000),
    ('93344ef0-d344-11eb-a46c-026f410a6142', 'transferStatus', true),
    ('52510c32-d344-11eb-a46c-026f410a6142', 'add_bank', true),
    ('5e02ba98-d344-11eb-a46c-026f410a6142', 'billStatus', true),
    ('6506d30c-d344-11eb-a46c-026f410a6142', 'banking_service', 'mono'),
    ('6506d30c-d344-11eb-a46c-026f410a6142', 'card_verification_amount', null),
    ('93344ef0-5b8b-4443-b7d7-4273fb13fdcf', 'update_message', null);

  
INSERT INTO kabani.permission_types (id, name, display_name, description, enabled) SELECT id, name, display_name, description, enabled FROM aella_money.permissions;

ALTER TABLE kabani.permissions
    MODIFY id INT NOT NULL AUTO_INCREMENT;
INSERT INTO kabani.permissions (type_id, role_id) SELECT permission_id, role_id FROM aella_money.permission_role;
ALTER TABLE kabani.permissions
    MODIFY id CHAR(36) NOT NULL;

INSERT INTO kabani.roles (id, name, display_name, description, enabled) SELECT id, name, display_name, description, enabled FROM aella_money.roles;

UPDATE kabani.users as u, aella_money.role_user as r SET u.role_id = r.role_id WHERE  u.id = r.user_id;

INSERT INTO 
    webhooks (id, name, description, method, url, payload, headers, enabled) 
VALUES
    ('ea88ab31-417a-4798-837b-87a97f5ea147', 'isw-cards-health', null, 'Get', 'https://cards.aellapp.com/isw/health', null, null, 1),
    ('60ff0ab2-68aa-402c-890f-51d91e8fd554', 'isw-cards-enquiry', null, 'Post', 'https://cards.aellapp.com/isw/enquiry', null, null, 1),
    ('1b1c66a3-923c-4903-9462-09dd46f28e15', 'isw-cards-debit', null, 'Post', 'https://cards.aellapp.com/isw/debit', null, null, 1),
    ('e3d7fb72-e765-4098-97e3-13c18dbffa78', 'isw-cards-reverse', null, 'Post', 'https://cards.aellapp.com/isw/reverse', null, null, 1),
    ('e40facee-9134-43f5-af77-c867893f5fef', 'isw-cards-lien-place', null, 'Post', 'https://cards.aellapp.com/isw/lien/place', null, null, 1),
    ('cfcdc460-39fa-48a3-ac9b-56ed3986f649', 'isw-cards-lien-debit', null, 'Post', 'https://cards.aellapp.com/isw/lien/debit', null, null, 1);



UPDATE users 
SET tier = 3
WHERE phone_otp_verified = 1
    AND image IS NOT NULL
    AND no_of_children IS NOT NULL
    AND marital_status IS NOT NULL
    AND bvn_otp_verified = 1
    AND date_of_birth IS NOT NULL
    AND document_state IS NOT NULL
    AND (tier IS NULL OR tier < 3);
    
UPDATE users 
SET tier = 2
WHERE phone_otp_verified = 1
    AND image IS NOT NULL
    AND no_of_children IS NOT NULL
    AND marital_status IS NOT NULL
    AND bvn_otp_verified = 1
    AND date_of_birth IS NOT NULL
    AND (tier IS NULL OR tier < 2);

UPDATE users 
SET tier = 1 
WHERE phone_otp_verified = 1 
    AND image IS NOT NULL
    AND no_of_children IS NOT NULL
    AND marital_status IS NOT NULL
    AND (tier IS NULL OR tier < 1);

UPDATE users 
SET tier = 0 
WHERE phone_otp_verified = 1
    AND (tier IS NULL OR tier < 0);

CREATE TABLE `policies` (
  `id` varchar(36) NOT NULL,
  `type` varchar(52) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `enabled` tinyint DEFAULT 1,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_603e09f183df0108d8695c57e2` (`id`),
  KEY `IDX_703e09f183df0108d8695c79e2` (`type`),
  KEY `IDX_803e09f183df0108d8695c68e2` (`key`),
  KEY `IDX_903e09f183df0108d8695c68f5` (`value`)
);

INSERT INTO 
    `policies` (id, `key`, value) 
VALUES
    (uuid(), 'enrollmentBranch', '[enrollmentBranch1]'),
    (uuid(), 'enrollmentBranch', '[enrollmentBranch2]'),
    (uuid(), 'enrollmentBranch', '[enrollmentBranch3]');

INSERT INTO 
    `fraud_types` (`id`, `type`, `message`, `created_at`, `updated_at`, `deleted_at`) 
VALUES
    ('b3dd1797-b8d0-439d-ae58-dfa64c6c9c50', 'BVN Fraud',	'BVN belongs to banned locations',	now(), now(),	NULL);

ALTER TABLE `bvns`
    ADD COLUMN `lga_of_residence` VARCHAR(255) NULL,
    ADD COLUMN `lga_of_origin` VARCHAR(255) NULL,
    ADD COLUMN `residential_address` VARCHAR(255) NULL,
    ADD COLUMN `state_of_origin` VARCHAR(255) NULL,
    ADD COLUMN `enrollment_bank` VARCHAR(255) NULL,
    ADD COLUMN `enrollment_branch` VARCHAR(255) NULL,
    ADD COLUMN `name_on_card` VARCHAR(255) NULL;


INSERT INTO 
    `fraud_types` (`id`, `type`, `message`, `created_at`, `updated_at`, `deleted_at`) 
VALUES
    ('0ca0c839-d2f1-4a3a-b989-cf6d98ddc15b', 'Image Fraud',	'Fraudulent profile image',	now(), now(),	NULL);