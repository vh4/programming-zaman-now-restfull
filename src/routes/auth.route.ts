import express, { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';

class Router {
    private router = express.Router();
    private service = new UserService();

    constructor() {
        this.init();
    }

    private init() {
        this.router.post('/sign_in', this.handleLogin.bind(this));
        this.router.post('/create', this.handleCreate.bind(this));
    }

    private async handleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.body;

            req.requests  = user;
            const result = await this.service.login(user);
            req.responses = result;

            res.status(200).json({
                response_code:'00',
                response_message:'Success',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    private async handleCreate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.body;

            req.requests  = user;
            const result = await this.service.register(user);
            req.responses = result;

            res.status(200).json({
                response_code:'00',
                response_message:'Success',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    public get() {
        return this.router;
    }
}

export default new Router().get();
