import Joi from "joi";
import { Contact } from '../../intefaces/contact.interface';

class ContactValidator{

	create(): Joi.ObjectSchema<Contact>{
		return Joi.object<Contact>({
			
		})
	}
}