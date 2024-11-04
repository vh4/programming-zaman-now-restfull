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
    public  ports: number = parseInt(process.env.PORT || '3000');
    private secretRefresh: string = process.env.ACCESS_TOKEN || '';
    private secretAccess: string = process.env.REFRESH_TOKEN || '';

    public getSecretRefresh():string{
      return this.secretAccess;
    }

    public getSecretAccess():string{
      return this.secretRefresh;
    }

    public port():number{ 
      logger.info(`Server running on port => ${this.ports}`);
      return this.ports;
    }

    public runIn():void{
      logger.info(`Using environment => ${this.appName}`);
    }

}

export default Env;
