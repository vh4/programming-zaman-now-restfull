import Env from "./env/env";
import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
import helmet from "helmet";

function boostraps(){

    //initila env
    const env = new Env();

    //initial express
    const app = express();

    //use for middlewar express
    app.use(express.json());
    app.use(cookieParser());
    app.use(helmet());
    app.use(cors());

    //running....
    env.runIn();
    app.listen(env.port());
    
}


boostraps();