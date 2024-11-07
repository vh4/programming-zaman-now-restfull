import Env from "./env/env";
import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
import helmet from "helmet";
import authRoute from "./routes/auth.route";
import {initDB} from './databases/index'
import { ErrorHandlerMain } from "./handle/error.handle";
import { SuccessResponse } from "./handle/success.handle";
import { MID } from "./middleware/mid.middleware";

function boostraps(){

    //initila env
    const env = new Env();

    //initial express
    const app = express();

    //init DB
    initDB();

    //use for middlewar express
    app.use(express.json());
    app.use(cookieParser());
    app.use(helmet());
    app.use(cors());
    app.use(MID);

    //running....
    env.runIn();
    app.listen(env.port());
    app.use(authRoute)
    app.use(SuccessResponse);
    app.use(ErrorHandlerMain);

}


boostraps();