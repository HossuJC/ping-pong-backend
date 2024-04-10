import { loadPlayerInfo } from "./player.controller.js";

export function getLeaderboard(req, res) {
    let players = loadPlayerInfo();
    players.sort((a, b) => {
        if (a.wins !== b.wins) {
            return b.wins - a.wins;
        } else {
            return a.cumulative_points - b.cumulative_points;
        }
    });
    res.status(200).send({message: "Leaderboard fetched", data: players})
}