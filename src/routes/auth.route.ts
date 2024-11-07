import express, {NextFunction, Request, Response} from 'express';
import { User } from '../intefaces/user.interface';
import UserService from '../services/user.service';

class Router {
    private router = express.Router();
    private service = new UserService();

    constructor() {

        this.init();
    }

    private init(){
        this.router.post('/sign_in', this.handleLogin);
        this.router.post('/create', this.handleCreate);
        this.router.get('/profile/:username', this.handleProfile)
    }

    private async handleLogin(req: Request, res: Response, next:NextFunction): Promise<void>{
        try {
            const user:User = req.body;
            const result = this.service.login(user);
            res.status(200).json({
                data:result
            })
        } catch (error) {
            next(error);
        }
    }

    private async handleCreate(req: Request, res: Response, next:NextFunction): Promise<void>{
        try {
            const user:User = req.body;
            const result = this.service.register(user);
            res.status(200).json({
                data:result
            })
        } catch (error) {
            next(error);
        }
    }

    private async handleProfile(req: Request, res: Response, next:NextFunction): Promise<void>{
        try {
            const username:string = req.params.username;
            const result = this.service.get(username);
            res.status(200).json({
                data:result
            })
        } catch (error) {
            next(error);
        }
    }

    public get() {
        return this.router;
    }

}

export default new Router().get();
