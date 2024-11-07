import { NextFunction, Request, Response } from 'express';
import { checkIP } from '../helpers/ip';
import { getNextMID } from '../helpers/mid';
import '../intefaces/express.global';

export const MID = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        req.payload = { mid: await getNextMID(), ip:checkIP(req, res) };
        next();
    } catch (error) {
        next(error);
    }
};