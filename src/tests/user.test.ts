import supertest from "supertest";
import { prismaClient } from "../databases/index";
import { app } from "../index";

describe("POST /create", () => {
  const user = {
    username: "root",
    password: "root123",
    name: "Root user",
  };

  const Invaliduser = {
    username: "",
    password: "",
    name: "",
  };

  beforeEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "root",
      },
    });
  });

  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "root",
      },
    });
  });

  it("should return success if user does not exist", async () => {
    const response = await supertest(app)
      .post("/create")
      .send(user)
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.response_code).toBe("00");
    expect(response.body.response_message).toBe("Success");
  });

  it("should return username already exists", async () => {
    let response = await supertest(app)
      .post("/create")
      .send(user)
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.response_code).toBe("00");
    expect(response.body.response_message).toBe("Success");

    response = await supertest(app)
      .post("/create")
      .send(user)
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(400);
    expect(response.body.response_message.username).toBeDefined();
    expect(response.body.response_message.username).toBe(
      "Username already exists!"
    );
  });

  it("should return invalid when data not completed", async () => {
    const response = await supertest(app)
      .post("/create")
      .send(Invaliduser)
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(400);
    expect(response.body.response_code).toEqual("03");
    expect(response.body.response_message.username).toBeDefined();
    expect(response.body.response_message.password).toBeDefined();
    expect(response.body.response_message.name).toBeDefined();
  });
});
