import supertest from "supertest";
import { app } from "../index";
import { JwtCreate } from "../helpers/global";
import Env from "../env/env";
import { UserJwt } from "../intefaces/user.interface";

describe('GET /me', () => {

	const env = new Env();

	it('should return 401 unauthorized token', async () => {
		const response = await supertest(app).
						 get('/me/toni');
	
		expect(response.status).toBe(401);
		expect(response.body.response_message.auth).toBeDefined();
		expect(response.body.response_code).toEqual('01');
	
	  });
	
	  it('should return 200 me success', async () => {
			
		    const user:UserJwt = {
				username:'toni',
				name:'Fathoni W,J.'
			}

		    const token = await JwtCreate(user, env.getSecretAccess(), env.getExpiredAccess());
			// console.log(token);

			const response = await supertest(app).
						 		   get('/me/toni').
								   set('Authorization', `Bearer ${token}`)

			expect(response.body.response_code).toBe('00');
			expect(response.body.response_message).toBe('Success');
			expect(response.status).toBe(200);
			expect(response.body.data).toMatchObject;

	  });	

})
