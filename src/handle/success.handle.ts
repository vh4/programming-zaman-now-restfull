import { Request, Response } from 'express';
import '../intefaces/express.global';
import logger from '../helpers/logger';

export async function SuccessResponse(error:any, req: Request, res: Response): Promise<void> {
   
    const response = req.responses;
    if (req.responses && typeof req.responses === 'object' && !Array.isArray(req.responses) && Object.keys(req.responses).length > 0) {
        
        //save to db 
        //if you want to save req and resp to db.
         //end save to db

        logger.info(`MID ${req.payload.mid} Success request  => ${JSON.stringify(req.requests)}`);
        logger.info(`MID ${req.payload.mid} Success response => ${JSON.stringify(req.responses)}`);

        res.status(response.http_code).json({
            mid:req.payload.mid,
            response_code: response.response_code,
            response_message: response.response_message,
            ...response
        });
    }
        
    logger.info(`MID ${req.payload.mid} Error on success handler request  => ${JSON.stringify(req.requests)}`);
    logger.info(`MID ${req.payload.mid} Error on success handler response => ${JSON.stringify(req.responses)}`);
    logger.info(`MID ${req.payload.mid} Error on success handler error    => ${JSON.stringify(error.message instanceof Error)}`);

    //save to db 
    //if you want to save req and resp to db.
    //end save to db

    res.status(500).json({
        mid:req.payload.mid,
        response_code: '68',
        response_message:'Format error / Server error',
        ...req.requests,
    });

}
