import * as env from 'dotenv';
import path from 'path';
import logger from '../helpers/logger'

env.config(
  { 
    path: path.resolve(__dirname, '../../.env') 
  }
);

class Env {

    private appName: string = process.env.APP_NAME || '';
    public static port: number = parseInt(process.env.PORT || '3000');

    constructor() {

        logger.info(`Using environment => ${this.appName}`);
        logger.info(`Server running on port => ${Env.port}`);

    }
}

export default Env;
