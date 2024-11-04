import { User } from "../../intefaces/user.interface";
import Joi from "joi";

class UserValidation {

    create(): Joi.ObjectSchema<User> {
        return Joi.object<User>({
            name: Joi.string().max(255).required(),
            username: Joi.string().max(100).required(),
            password: Joi.string().max(100).required(),
            token: Joi.string().optional(),
        });
    }

    update(): Joi.ObjectSchema<User> {
        return Joi.object<User>({
            name: Joi.string().max(255).required(),
            username: Joi.string().max(100).required(),
            password: Joi.string().max(100).required(),
            token: Joi.string().optional(),
        });
    }

    login(): Joi.ObjectSchema<User>{
        return Joi.object<User>({
            username: Joi.string().max(100).required(),
            password: Joi.string().max(100).required(),
        });
    }

    get(): Joi.StringSchema {
        return Joi.string().max(100).required();
    }

}


const userValidation = new UserValidation();
export default userValidation;