import request from "supertest";
import app from "../server.js";
import userModel from "../models/userModel.js";

describe("User endpoints", () => {
  it("Should create a new user and save it to the database", async () => {
    const newUser = {
      username: "testUser1",
      email: "testUser1@example.com",
      password: "password123",
      total_points: 5,
    };

    const response = await request(app).post("/api/users/add").send(newUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User created");
    expect(response.body.user).toHaveProperty("username", "testUser1");
    expect(response.body.user).toHaveProperty("email", "testUser1@example.com");
    expect(response.body.user).toHaveProperty("total_points", 5);

    const user = await userModel.findOne({ email: newUser.email });
    expect(user).toBeTruthy();
    expect(user.username).toBe(newUser.username);
    expect(user.total_points).toBe(newUser.total_points);
  });
});
