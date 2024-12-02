import request from "supertest";
import app from "../server.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

beforeAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}, 20000);

describe("User endpoints", () => {
  let createdUser;

  it("Should create a new user and save it to the database", async () => {
    const newUser = {
      username: "testUser2",
      email: "testUser2@example.com",
      password: "password123",
    };

    const response = await request(app).post("/api/users/add").send(newUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User created");
    expect(response.body.user).toHaveProperty("username", "testUser2");
    expect(response.body.user).toHaveProperty("email", "testUser2@example.com");

    const user = await userModel.findOne({ email: newUser.email });
    createdUser = user;

    expect(user).toBeTruthy();
    expect(user.username).toBe(newUser.username);
  });

  it("Should login with correct email & password", async () => {
    const loginData = {
      email: "testUser2@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("userId", createdUser.id);
    expect(response.body).toHaveProperty("email", loginData.email);
    expect(response.body).toHaveProperty("username", createdUser.username);
  });
}, 20000);
