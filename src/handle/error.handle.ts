import { NextFunction, Request, response, Response } from "express";
import '../intefaces/express.global';
import logger from "../helpers/logger";

class ErrorHandler extends Error {
    
    public status: number;
    public response_code?: string;

    constructor(status: number, response_code: string, message: string) {
        super(message);
        this.status = status;
        this.response_code = response_code;

        this.name = this.constructor.name;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export function ErrorHandlerMain(error:any, req:Request, res:Response, next:NextFunction){
    if(error instanceof Error){

        logger.info(`MID ${req.payload.mid} Error on error handler request  => ${JSON.stringify(req.requests)}`);
        logger.info(`MID ${req.payload.mid} Error on error handler response => ${JSON.stringify(req.responses)}`);
    
        //save to db 
        //if you want to save req and resp to db.
        //end save to db    

        res.status(500).json({
            response_mid:req.payload.mid,
            response_code:'68',
            response_message:'Format error / Server error',
            ...req.requests
        })
    }
}


export { ErrorHandler };
