# Digit Boiler-Plate

## Digit
Digit handles all requests. User related requests like registration and password reset are internally handled by Digit, however, request meant for specific services are proxied to the respective service for handling. 

### Deployment
1. Define Environmental Variables. 
```bash
BASE_PATH=School-app
SERVICE_NAME=School-app
SERVICE_URL=digit_school
NODE_ENV=development

PORT=4000

DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=school
DB_SYNC= 

#Never set to true in production, you can lose production data
DB_LOG=false

THROTTLE_TTL = 60
THROTTLE_LIMIT = 60

HTTP_TIMEOUT=5000
HTTP_MAX_REDIRECTS=5

JWT_SECRET=r5u8x/A?D(G+KbPdSgVkYp3s6v9y$B&E
JWT_EXPIRY=500
ENCRYPTION_KEY=dSgVkYp3s6v9y$B&E(H+MbQeThWmZq4t  
# Must be 256 bits (32 characters)

AWS_S3_KEY=
AWS_S3_SECRET_KEY=
AWS_S3_BUCKET=
AWS_S3_DIR=user_image
AWS_S3_DIR_STAGE=user_image_staging
AWS_S3_REGION="eu-west-1"

OTP_EXPIRY_DURATION=86400 
# 24 hrs, in seconds
SENTRY_DNS=
RUDDERSTACK_SOURCE_ID=
RUDDERSTACK_WRITE_KEY=
RUDDERSTACK_TOKEN=
RUDDERSTACK_DATA_PLANE_URL=
NEVER_BOUNCE_API_KEY=
REDIS_HOST=redis-18536.c135.eu-central-1-1.ec2.cloud.redislabs.com
REDIS_PORT=18536
REDIS_PASS=PGiV8rI5NUGJkcAVcTKyHClusvSmBIHW
REDIS_DB=0
I18N_LANG = 'en'
I18N_SOURCE = '/i18n/'

DOCUMENT_BASE_URL=
BVN_URL=
PWA_BASE_URL=

DD_SWITCH=
DD_BASE_URL=

# Services
ELIGIBILITY_BASE_URL=
TRANSFER_BASE_URL=
LOAN_BASE_URL=
WALLET_INTEREST_BASE_URL=
MARKETPLACE_BASE_URL=
CARD_BASE_URL=
ACCOUNT_GENERATION_BASE_URL=
WALLET_BASE_URL=
```

2. Install dependencies
```bash
$ cd Digit
$ yarn install
```

6. Start App
```bash
$ yarn run start // app is started on port 3005
$ yarn run start:watch // watch changes only
$ yarn run start:debug // watch and debug
$ yarn run build // build for production
$ yarn run start:prod
```

7. More Out of the Box
```bash
Swagger/Open Api Documentation and Test
- visit http://localhost:3005/api
- visit http://localhost:3005/api/json

Compodoc Documentation
- run  `$ npx @compodoc/compodoc -p tsconfig.json -s`
- visit http://localhost:8080.

HealthChecks using Terminus
- visit http://localhost:3005/health
```

### More CLI Operations
1. Run Migration
```bash
$ npm run migrate:run 
```
See [Migration](https://typeorm.io/#/migrations) for more.

2. Run Seeding
```
$ npm run seed:run 
```

### User Languange
The default language is English ('en'). To select a custom language for a request, clients can use any of the following options:
1. Query - add `lang=en`to all query
```
...?lang=en
```

2. Header - add `x-aella-lang=en`to request header
```
x-aella-lang=en
```

### Todo
- Add unit test
- A backdoor for customer care, a readonly login as a customer
