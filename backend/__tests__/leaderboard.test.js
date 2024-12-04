import request from "supertest";
import app from "../server.js";

describe("Leaderboard with top users", () => {
  it("Should fetch top users sorted by total_points", async () => {
    const response = await request(app).get("/api/leaderboard");

    const leaderboard = response.body;

    expect(response.statusCode).toBe(200);
    expect(leaderboard.length).toBe(4);

    for (let i = 0; i < leaderboard.length - 1; i++) {
      expect(leaderboard[i].total_points).toBeGreaterThanOrEqual(
        leaderboard[i + 1].total_points
      );
    }

    leaderboard.forEach((user, index) => {
      expect(user.rank).toBe(index + 1);
    });

    console.log("Leaderboard", leaderboard);
  });
});
