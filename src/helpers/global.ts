import { UserJwt } from "../intefaces/user.interface";
import jwt from "jsonwebtoken";

export const JwtCreate = async (user:UserJwt, key:string, expiredIn:string) : Promise<string> => {
	return jwt.sign({
		username:user.username,
		name:user.name,
	}, key, {
		expiresIn:expiredIn
	});
};