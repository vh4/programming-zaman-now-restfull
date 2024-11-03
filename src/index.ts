import Env from "./env/env";
import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
import helmet from "helmet";

function boostraps(){

    //initila env
    new Env();

    //initial express
    const app = express();

    //use for middlewar express
    app.use(express.json());
    app.use(cookieParser());
    app.use(helmet());
    app.use(cors());

    //check conneection databases
    app.listen(Env.port);
    
}


boostraps();