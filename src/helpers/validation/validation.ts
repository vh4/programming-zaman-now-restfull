import { User } from "../../intefaces/user.interface";
import { ErrorHandler } from "../../handle/error.handle";
import { ObjectSchema } from "joi";

class Validator {
    validate(schema: ObjectSchema<User>, request:User): User {
        
        const result = schema.validate(request, {
            abortEarly:false,
            allowUnknown:false,
        });

        if (result.error) {
            throw new ErrorHandler(400, '68', result.error.message);
        } else {
            return result.value;
        }
    }
}

const validator = new Validator();
export default validator;
