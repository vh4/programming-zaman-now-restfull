import express, { NextFunction, Request, Response } from 'express'

class NOT_FOUND{

	private router = express.Router();

	constructor(){
		this.init();
	}

	private init(){
		this.router.get('*', this.GET.bind(this));
		this.router.post('*', this.POST.bind(this));
		this.router.put('*', this.PUT.bind(this));
		this.router.delete('*', this.DELETE.bind(this));
	}

	private GET(req: Request, res:Response, next:NextFunction){
		try {
			res.status(404).json({
				response_code:'05',
				response_message:'/GET NOT_FOUND'
			});
		} catch (error) {
			next(error)
		}
	}

	private POST(req: Request, res:Response, next:NextFunction){
		try {
			res.status(404).json({
				response_code:'05',
				response_message:'/POST NOT_FOUND'
			});
		} catch (error) {
			next(error)
		}
	}


	private PUT(req: Request, res:Response, next:NextFunction){
		try {
			res.status(404).json({
				response_code:'05',
				response_message:'/PUT NOT_FOUND'
			});
		} catch (error) {
			next(error)
		}
	}

	private DELETE(req: Request, res:Response, next:NextFunction){
		try {
			res.status(404).json({
				response_code:'05',
				response_message:'/DELETE NOT_FOUND'
			});
		} catch (error) {
			next(error)
		}
	}

	public get(){
		return this.router
	}

}


export default new NOT_FOUND().get();