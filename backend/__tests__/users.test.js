import request from "supertest";
import app from "../server.js";
import userModel from "../models/userModel.js";

beforeAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}, 20000);

describe("User endpoints", () => {
  it("Should create a new user and save it to the database", async () => {
    const newUser = {
      username: "testUser1",
      email: "testUser1@example.com",
      password: "password123",
      total_points: 3,
    };

    const response = await request(app).post("/api/users/add").send(newUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User created");
    expect(response.body.user).toHaveProperty("username", "testUser1");
    expect(response.body.user).toHaveProperty("email", "testUser1@example.com");

    const user = await userModel.findOne({ email: newUser.email });
    expect(user).toBeTruthy();
    expect(user.username).toBe(newUser.username);
  });
}, 20000);
