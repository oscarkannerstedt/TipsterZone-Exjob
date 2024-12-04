import request from "supertest";
import app from "../server.js";

describe("Fetch all matches from API", () => {
  const validLeague = "PL"; //Premier League
  const invalidLeague = "INVALID_LEAGUE";

  it("Should return 400 if no league is provided", async () => {
    const response = await request(app).get("/api/matches");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "No league found" });
  });

  it("Should fetch matches for a valid league", async () => {
    const response = await request(app).get(
      `/api/matches?league=${validLeague}`
    );
    const { matches } = response.body;

    expect(response.status).toBe(200);
    expect(Array.isArray(matches)).toBe(true);
    expect(matches.length).toBeGreaterThan(0);

    matches.forEach((match) => {
      expect(match.status).toBe("TIMED");
    });
  });

  it("Should return 500 for an invalid league", async () => {
    const response = await request(app).get(
      `/api/matches?league=${invalidLeague}`
    );

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Error while get data from api" });
  });
});
