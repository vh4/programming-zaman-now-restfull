import { Contact } from "../intefaces/contact.interface";
import { prismaClient } from "../databases";

class ContactService{

	constructor(){

	}

	public create = (req:Contact) => {
		const contact = validat
		return prismaClient.contact.create({
			data:contact
		})
	}

}