import bcrypt from 'bcrypt'
import { User,UserResponse } from "../intefaces/user.interface";
import userValidation from "../helpers/validation/user.validation";
import validator from "../helpers/validation/validation";
import { prismaClient } from "../databases/index";
import { ErrorHandler } from "../handle/error.handle";
import Env from '../env/env';
import { JwtCreate } from '../helpers/global';

class UserService{

    private secretAccess:string = '';
    private secretRefresh:string = '';
    private accessToken:string = '';
    private refreshToken:string = '';
    private expiretRefresh:string = '';
    private expireAccess:string = '';

    constructor(){
        
        const env = new Env();
        this.secretAccess  = env.getSecretAccess();
        this.secretRefresh = env.getSecretRefresh();
        this.expiretRefresh = env.getExpiredRefresh();
        this.expireAccess = env.getExpiredAccess();

    }
    async register(request:User): Promise<UserResponse> {
        
        const user = validator.validate(
            userValidation.create(), 
            request);


        const countUser = await prismaClient.user.count({
            where: {
                username: user.username
            }
        });

        if (countUser > 0)
            throw new ErrorHandler(400, '03', {username: 'Username already exists!' });

        user.password = await bcrypt.hash(user.password, 10);
        return prismaClient.user.create({
            data: user,
            select: {
                username: true,
                name: true
            }
        });
    }

    async login(request:User): Promise<UserResponse> {

        const user = validator.validate(
            userValidation.login(), 
            request);

        const isExist = await prismaClient.user.findUnique({
            where:{
                username:user.username
            },
            select:{
                username:true,
                password:true,
                name:true
            }
        })

        if(!isExist) 
            throw new ErrorHandler(401, '01', {username: 'Username or password is wrong!' });

        const password = await bcrypt.compare(user.password, isExist.password);
        if(!password) 
            throw new ErrorHandler(401, '01', {username: 'Username or password is wrong!' });

        this.accessToken = await JwtCreate(user, this.secretAccess, this.expireAccess);
        this.refreshToken = await JwtCreate(user, this.secretRefresh, this.expiretRefresh);

        const updated = await prismaClient.user.update({
            data:{
                token:this.refreshToken
            },
            where:{
                username:user.username
            },
            select:{
                username:true,
                name:true,
            }
        });

        return {
            ...updated,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            expiredIn: '60s'
        };

    }
    
    async get(reqUsername:string): Promise<UserResponse>{

        const username = validator.validate(userValidation.get(), reqUsername);
        
        const resp = await prismaClient.user.findUnique({
            where:{
                username:username
            },
            select:{
                username:true,
                name:true,
            }
        });

        if(!resp) 
            throw new ErrorHandler(400, '03', {username: 'Username not found!' })
        
        return {
            username:resp.username,
            name:resp.name
        };
        
    }

}

export default UserService;