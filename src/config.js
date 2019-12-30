import dotenv from 'dotenv';
import { dirname, resolve, join } from 'path';
// import { existsSync, mkdirSync } from 'fs';

class Config {
  constructor() {
    this.config = {};
  }

  configure() {

    if (process.env.NODE_ENV === 'test') {
      dotenv.config({ path: resolve('test.env') });
    } else {
      dotenv.config();
    }

    if (!process.env.APP_NAME) {
      console.error(`Environment file (.env) cannot be found in the root folder, copy .env.example file to .env.`);
      process.exit(1);
    }
    process.env.BASE_PATH = dirname(resolve('index.js'));

  }

  get(key) {
    return this.config[key] || null;
  }
  
  getServerConfig() {
    return {
      port: process.env.APP_PORT || this.get('APP_PORT'),
      host: process.env.APP_HOST || this.get('APP_HOST'),
    }
  }

  getAuthConfig() {
    return {
      sid: process.env.AUTH_COOKIE_SID || this.get('AUTH_COOKIE_SID'),
      label: process.env.AUTH_COOKIE_LABEL || this.get('AUTH_COOKIE_LABEL'),
      password: process.env.AUTH_COOKIE_PASSWORD || this.get('AUTH_COOKIE_PASSWORD'),
      secure: (process.env.AUTH_COOKIE_SECURE === 'true') || (this.get('AUTH_COOKIE_SECURE') === 'true'),
      httpOnly: (process.env.AUTH_COOKIE_HTTPONLY === 'true') || (this.get('AUTH_COOKIE_HTTPONLY') === 'true'),
      ttl: Number(process.env.AUTH_COOKIE_TTL) * 60 * 1000,
    }
  }
}

export default Config;
