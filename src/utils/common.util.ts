import { ModuleRef } from '@nestjs/core';
import { I18nContext, translateOptions } from 'nestjs-i18n';
import path from 'path';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  lstatSync,
  copyFileSync,
  symlinkSync,
  readlinkSync,
  mkdir,
  rmdir,
} from 'fs';
import { BadRequestException } from '@nestjs/common';
import { isEmail, isNumberString } from 'class-validator';
import { Between, Like } from 'typeorm';
import { dateForSearch } from './time.utils';
import { createHash, randomBytes } from 'crypto';
import { hostname } from 'os';
import { User } from '../api/user';

export const randomDigits = (length = 5) => {
  return Math.random().toString().substr(2, length);
};

export const random = (length = 8) => {
  return randomBytes(Math.ceil(length)).toString('hex').substr(0, length)
};

export const environment = process.env.NODE_ENV;
export const isProduction = environment === 'production';
export const isTesting = environment === 'testing';
export const isLocal = environment === 'local';

/**
 * set up a handle for module ref
 * to be used to inject services without the contructor
 */
export let moduleRef: ModuleRef;
export const setModuleRef = (aModuleRef: ModuleRef) => {
  if (!moduleRef) {
    moduleRef = aModuleRef;
  }
};

export const outject = (service: any): any => {
  return moduleRef.get(service);
};

export const formatPhoneNumber = (value: string): string => {
  if(!value) {
    return value
  }
  return value.replace(/(^0)/, '234').replace(/(^\+)/, '');
};

export const unifyPhoneNumber = (value: string): string => {
  if (![11, 13, 14].includes(value?.length)) {
    throw new BadRequestException(
      `Invalid phone number. Phone number must start with +234, 234 or 0`,
    );
  }

  if (
    !value.startsWith('+234') &&
    !value.startsWith('234') &&
    !value.startsWith('0')
  ) {
    throw new BadRequestException(
      `Invalid phone number. Phone number must start with +234, 234 or 0`,
    );
  }

  return value.replace(/(^0)/, '234').replace(/(^\+)/, '');
};

export const isPhoneNumber = (value: string): boolean => {
  return (
    isNumberString(value) &&
    [11, 13, 14].includes(value?.length) &&
    (value.startsWith('+234') ||
      value.startsWith('234') ||
      value.startsWith('0'))
  );
};

export const isEmailAddress = (value: string): boolean => {
  return isEmail(value);
};

export function isNumeric(str: string) {
  return !isNullOrUndefined(str) && /^\d+$/.test(str);
}

export function isNullOrUndefined(value: any) {
  return value === undefined || value === null;
}

export function isUndefined(value: any) {
  return value === undefined;
}

export function isBlankString(value: any) {
  return value === '';
}

export function isFunction(value: any) {
  return typeof value === 'function';
}

export function isObject(x: any) {
  return x != null && typeof x === 'object';
}

export function isArray(x: any) {
  return x != null && typeof x === 'object' && Array.isArray(x);
}

export function toJSON(mayBeJSON: string, returnJSON = false) {
  try {
    const obj = JSON.parse(mayBeJSON);
    if (obj && typeof obj === 'object') {
      return returnJSON ? obj : true;
    }
  } catch (e) {}
  return false;
}

export function ucfirst(phrase: string) {
  var firstLetter = phrase.substr(0, 1);
  return firstLetter.toUpperCase() + phrase.substr(1);
}

export const titleCase = (phrase: string) => {
  
  if(!phrase) {
    return phrase
  }

  let upper = true;
  let newPhrase = '';
  for (let i = 0, l = phrase?.length; i < l; i++) {
    // Note that you can also check for all kinds of spaces  with
    // phrase[i].match(/\s/)
    if (phrase[i] == ' ') {
      upper = true;
      newPhrase += phrase[i];
      continue;
    }
    newPhrase += upper ? phrase[i].toUpperCase() : phrase[i].toLowerCase();
    upper = false;
  }
  return newPhrase;
};

export const prettify = (phrase: string) => {
  return phrase.replace(/_/g, ' ');
};

export type HttpResponse = [boolean, number, string, string, any];

export const trimString = (characters: string, replaceWith: string = '') => {
  return characters.replace(/^\//, replaceWith).replace(/\/$/, replaceWith);
};

export const __ = (key: string, options?: translateOptions) => {
  const i18n = outject(I18nContext) as I18nContext;
  return i18n.translate(key, options);
};

export function copy(src: string, dest: string) {
  if (!existsSync(dest)) mkdirSync(dest);

  readdirSync(src).forEach((dirent) => {
    const [srcPath, destPath] = [src, dest].map((dirPath) =>
      path.join(dirPath, dirent),
    );
    const stat = lstatSync(srcPath);

    switch (true) {
      case stat.isFile():
        copyFileSync(srcPath, destPath);
        break;
      case stat.isDirectory():
        copy(srcPath, destPath);
        break;
      case stat.isSymbolicLink():
        symlinkSync(readlinkSync(srcPath), destPath);
        break;
    }
  });
}

export const mkDir = (path: string, callback: (e: any) => void) => {
  mkdir(path, { recursive: false }, callback);
};

export const rmDir = (path: string, callback: (e: any) => void) => {
  rmdir(path, { recursive: false }, callback);
};

export const mask = (val: string, use = '*') => {
  if (!val) {
    return null;
  }
  return '*******';
};

export const makeFilter = (
  query: string,
  from: string,
  to: string,
  columns: string[],
) => {
  let dateRange = {};
  let filter = [];
  if (!!from && !!to) {
    dateRange = { created_at: Between(dateForSearch(from), dateForSearch(to)) };
  }
  try {
    const parsedQuery = JSON.parse(query);
    if (Array.isArray(parsedQuery)) {
      filter = [...filter, ...parsedQuery];
    } else {
      throw new Error("JSON parsed, but its not an array");
    }
  } catch (error) {
    filter = [
      ...filter,
      ...(!!query ? columns.map((column) => ({ [column]: Like(`%${query}%`), ...dateRange })) : [dateRange]),
    ];
  }

  return filter;
};

const maxLength = 32
const service = 'KBN' // 3 xters
const host = createHash('md5').update(hostname()).digest('hex').substr(0, 6) // 6 xters
const processId = ('' + process.pid).padStart(3, '0') // 3 xters
export const generateTransactionReference = () => {
  const time = new Date().getTime() // 13 xters
  const wildcard = randomBytes(256/8).toString('hex').substr(0, 7) // 7 xters
  return `${time}-${host}-${service}-${processId}-${wildcard}`.substr(0, maxLength).toUpperCase()
}

export const getTier = (user: User) => {
  const tier0 = !!user.phone_otp_verified
  const tier1 = tier0 && !!user.image && (!isNullOrUndefined(user.no_of_children)) && !!user.marital_status
  const tier2 = tier1 && !!user.bvn_otp_verified && !!user.date_of_birth
  const tier3 = tier2 && !!user.document_state

  if(tier3) { return 3 }
  if(tier2) { return 2 }
  if(tier1) { return 1 }
  if(tier0) { return 0 }

  return null
}

export const trimUser = (user: User) => {
  if(!user) {
    return user
  }
  return Object.keys(user).filter((k) =>  [
    'id',
    'customer_id',
    'gender',
    'no_of_children',
    'payday',
    'net_income',
    'date_of_birth',
    'date_of_employment',
    'monthly_income',
    'document_state',
    'employer',
    'employer_state',
    'next_of_kin_title',
    'next_of_kin_name',
    'next_of_kin_relationship',
    'next_of_kin_state',
    'first_name',
    'last_name',
    'email',
    'external_email',
    'email_valid',
    'phone_number',
    'bvn',
    'bvn_valid',
    'marital_status',
    'company_name',
    'next_of_kin_phone',
    'category',
    'phone_otp_verified',
    'email_otp_verified',
    'bvn_otp_verified',
    'bvn_phone_number',
    'tier',
    'is_user_banned',
    'fraudulent',
    'wallet_available',
    'device_type',
    'device_id',
    'language',
    'source',
    'merchant_id',
    'suspended_at',
    'closed_at',
    'state_of_residence',
    'created_at',
    'state_of_residence',
    'home_address',
  ].includes(k)).reduce((prev, curr) => {
    return { ...prev, [curr]: user[curr]}
  }, {})
  
}

export const prettyTimeLeft = (ms: number) => {
  if(!ms || ms < 0 || ms <= (1000 * 60)) {
    return `a minute`
  }

  const s = Math.round(ms / 1000)
  const m = Math.round(s / 60)
  if(m <= 60) {
    return `${m} minute(s)`
  }

  const h = Math.round(m / 60)  
  if(h <= 24) {
    return `${m} hour(s)`
  }

  const d = Math.round(h / 24)
  return `${d} day(s)`
}