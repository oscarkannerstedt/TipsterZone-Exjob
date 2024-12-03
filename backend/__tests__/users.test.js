import request from "supertest";
import app from "../server.js";
import userModel from "../models/userModel.js";

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

  it("Should update the user information", async () => {
    const updatedUserData = {
      username: "updatedTestUser",
      email: "updatedTestUser@example.com",
      password: "newpassword123",
    };

    const response = await request(app)
      .put(`/api/users/${createdUser._id}`)
      .send(updatedUserData);

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe(updatedUserData.username);
    expect(response.body.email).toBe(updatedUserData.email);

    const updatedUser = await userModel.findById(createdUser._id);
    expect(updatedUser.username).toBe(updatedUserData.username);
    expect(updatedUser.email).toBe(updatedUserData.email);
  });

  it("Should login with correct email & password", async () => {
    const loginData = {
      email: "updatedTestUser@example.com",
      password: "newpassword123",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("userId", createdUser.id);
    expect(response.body).toHaveProperty("email", loginData.email);
    expect(response.body).toHaveProperty("username", "updatedTestUser");
  });

  it("Should return 401 if password is incorrect", async () => {
    const loginData = {
      email: "updatedTestUser@example.com",
      password: "wrongPassword",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Wrong password");
  });

  it("Should return 401 if no user found", async () => {
    const loginData = {
      email: "noUserFound@example.com",
      password: "password123",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("No user found");
  });

  it("Should delete a user by ID", async () => {
    const userId = createdUser._id.toString();

    const responseDelete = await request(app)
      .delete(`/api/users/${userId}`)
      .send();

    expect(responseDelete.statusCode).toBe(200);
    expect(responseDelete.body.message).toBe("User was deleted successfully");

    const deletedUser = await userModel.findById(userId);
    expect(deletedUser).toBeNull();
  });
}, 20000);
