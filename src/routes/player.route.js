import { Router } from "express";
import { getPlayers, createPlayer, updatePlayer } from "../controlers/player.controller.js";

const playerRouter = Router();

playerRouter.get("/", (req, res) => getPlayers(req, res));
playerRouter.post("/", (req, res) => createPlayer(req, res));
playerRouter.patch("/", (req, res) => updatePlayer(req, res));

export default playerRouter;