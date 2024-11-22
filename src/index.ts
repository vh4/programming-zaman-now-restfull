import Env from "./env/env";
import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
import helmet from "helmet";
import authRoute from "./routes/auth.route";
import authUser from "./routes/user.route";
import NOT_FOUND from './routes/404.route'
import {initDB} from './databases/index'
import { ErrorHandlerMain } from "./handle/error.handle";
import { SuccessResponse } from "./handle/success.handle";
import { MID } from "./middleware/mid.middleware";

//initial express
export const app = express();

//bosrtrapping all function.
function boostraps(){

    //initila env
    const env = new Env();

    //init DB
    initDB();

    //use for middlewar express
    app.use(MID);
    app.use(express.json());
    app.use(cookieParser());
    app.use(helmet());
    app.use(cors());

    //running....
    env.runIn();
    env.testing() && app.listen(env.port());

    //router
    app.use(authRoute);
    app.use(authUser);
    app.use(NOT_FOUND);
    
    //handle success and error in end of router
    app.use(SuccessResponse);
    app.use(ErrorHandlerMain);

}

boostraps();