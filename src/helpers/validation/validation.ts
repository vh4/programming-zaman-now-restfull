import { ErrorHandler } from "../../handle/error.handle";
import { ObjectSchema, StringSchema } from "joi";

class Validator {
    validate<T>(schema: ObjectSchema<T>| StringSchema<T>, request: T): T {
        const result = schema.validate(request, {
            abortEarly: false,
            allowUnknown: false,
        });

        if (result.error) {
           
            const errorMessage = result.error.details.reduce((arr:any, detail) => {
                const key = detail.path.join();
                arr[key] = detail.message;
                return arr;
            }, {});

            throw new ErrorHandler(400, '03', errorMessage);
        } else {
            return result.value;
        }
    }
}

const validator = new Validator();
export default validator;
