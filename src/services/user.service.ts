import bcrypt from 'bcrypt'
import { User, UserResponse } from "../intefaces/user.interface";
import userValidation from "../helpers/validation/user.validation";
import validator from "../helpers/validation/validation";
import { prismaClient } from "../databases/index";
import { ErrorHandler } from "handle/error.handle";


class UserService{

    private request: User; 

    constructor(request:User){
        this.request = request;
    }
    async register(): Promise<UserResponse> {
        
        const user = validator.validate(
            userValidation.create(), 
            this.request);

        const countUser = await prismaClient.user.count({
            where: {
                username: user.username
            }
        });

        if (countUser > 0)
            throw new ErrorHandler(400, '03', 'Username already exists!');

        user.password = await bcrypt.hash(user.password, 10);
        return prismaClient.user.create({
            data: user,
            select: {
                username: true,
                name: true
            }
        });
    }

}

export default UserService;