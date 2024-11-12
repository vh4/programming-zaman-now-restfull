import { NextFunction, Request, response, Response } from "express";
import '../intefaces/express.global';
import logger from "../helpers/logger";

class ErrorHandler extends Error {
    
    public status: number;
    public response_code?: string;
    public response_message?: object;

    constructor(status: number, response_code: string, response_message: object) {
        super();
        this.status = status;
        this.response_code = response_code;
        this.response_message = response_message;

        this.name = this.constructor.name;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export function ErrorHandlerMain(error:any, req:Request, res:Response, next:NextFunction){


    //error for user input / body
    if(error instanceof ErrorHandler){
        logger.info(`MID ${req.payload.mid} Error on error handler request  => ${JSON.stringify(req.requests ?? '-')}`);
        logger.info(`MID ${req.payload.mid} Error on error handler response => ${JSON.stringify(error.response_message ?? '-')}`);

        //save to db 
        //if you want to save req and resp to db.
        //end save to db    

        res.status(error.status).json({
            response_mid:req.payload.mid,
            response_code:error.response_code,
            response_message:{
                ...error.response_message,
            },
            ...req.requests
        });

    }else if(error instanceof Error){
        logger.info(`MID ${req.payload.mid} Error on error handler request  => ${JSON.stringify(req.requests ?? '-')}`);
        logger.info(`MID ${req.payload.mid} Error on error handler response => ${JSON.stringify(req.responses ?? '-')}`);
        logger.info(`MID ${req.payload.mid} Error on error handler error    => ${JSON.stringify(error.message)}`);

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
