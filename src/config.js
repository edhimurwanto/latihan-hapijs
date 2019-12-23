import dotenv from 'dotenv';
import { dirname, resolve, join } from 'path';
// import { existsSync, mkdirSync } from 'fs';

export default function configure() {

  if (process.env.NODE_ENV === 'test') {
    dotenv.config({path: resolve('test.env')});
  } else {
    dotenv.config();
  }

  if (!process.env.APP_NAME) {
    console.error(`Environment file (.env) cannot be found in the root folder, copy .env.example file to .env.`);
    process.exit(1);
  }

  process.env.BASE_PATH = dirname(resolve('index.js'));
}
