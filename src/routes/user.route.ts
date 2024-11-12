import expres, { NextFunction, Request, Response } from 'express'
import UserService from '../services/user.service';
import Middleware from '../middleware/auth.middleware';

class Router{

	private router  = expres.Router();
	private service = new UserService();

	constructor(){
		this.init();
	}

	private init(){
		this.router.get('/me', Middleware.authenticate, this.handleProfile.bind(this));
	}

	private async handleProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const username = req.params.username;

            req.requests  = username;
            const result = await this.service.get(username);
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