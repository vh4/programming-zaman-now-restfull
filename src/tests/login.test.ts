import supertest from "supertest";
import { prismaClient } from "../databases/index";
import { app } from "../index";
import bcrypt from 'bcrypt';

describe('POST /sign_in', () => {
	const dataNotValid = {
		username: '',
		password: ''
	};

	const dataNotExists = {
		username: 'xxxz',
		password: 'wwww'
	};

	const validUser = {
		username: 'login',
		password: 'anakmami'
	};

	beforeEach(async () => {
		// Create a test user for the login success case
		await prismaClient.user.create({
			data: {
				name: 'Login',
				username: validUser.username,
				password: await bcrypt.hash(validUser.password, 10)
			}
		});
	});

	afterEach(async () => {
		// Clean up test data after each test
		await prismaClient.user.deleteMany({
			where: {
				username: validUser.username
			}
		});
	});

	it('should be invalid if username or password is empty', async () => {
		const response = await supertest(app)
			.post("/sign_in")
			.send(dataNotValid)
			.set("Content-Type", "application/json");

		expect(response.status).toBe(400);
		expect(response.body.response_code).toEqual('03');
		expect(response.body.response_message).toBeDefined();
		expect(response.body.response_message.username).toBeDefined();
		expect(response.body.response_message.password).toBeDefined();
	});

	it('should allow valid login', async () => {
		const response = await supertest(app)
			.post("/sign_in")
			.send(validUser)
			.set("Content-Type", "application/json");

		expect(response.status).toBe(200);
		expect(response.body.response_code).toEqual('00');
		expect(response.body.response_message).toEqual('Success');
		expect(response.body.data.accessToken).toBeDefined();
		expect(response.body.data.refreshToken).toBeDefined();
	});

	it('should be invalid if username or password does not exist', async () => {
		const response = await supertest(app)
			.post("/sign_in")
			.send(dataNotExists)
			.set("Content-Type", "application/json");

		expect(response.status).toBe(401);
		expect(response.body.response_code).toEqual('01');
		expect(typeof response.body.response_message).toEqual('object');
	});
});
