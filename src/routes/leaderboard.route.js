import { Router } from "express";
import { getLeaderboard } from "../controlers/leadetboard.controller.js";

const leaderboardRouter = Router();

leaderboardRouter.get("/", (req, res) => getLeaderboard(req, res));

export default leaderboardRouter;