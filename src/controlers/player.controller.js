import Player from '../models/player.js';
import fs from 'fs';

const player_data = "resources/player-data.txt";

export function createPlayer(req, res) {
    let name = req.query.name;
    let wins = req.query.wins || 0;
    let cumulative_points = req.query.cumulative_points || 0;
    let player = new Player(name, wins, cumulative_points);
    let players = loadPlayerInfo();
    if (players.find((p) => p.name == name)) {
        res.status(500).send("New player has a name already registered.");
    } else {
        fs.appendFile(player_data, "|" + name + ";" + wins + ";" + cumulative_points, (err) => {
            if (err) {
                console.error("Error on appending to file: ", err);
                res.status(500).send("Error creating new player.");
            }
        })
        console.log("New Player created.");
        res.status(200).send({message: "New Player created", data: player});
    }
}

export function getPlayers(req, res) {
    let players = loadPlayerInfo();
    res.status(200).send({message: players.length + " players fetched.", data: players});
}

export function updatePlayer(req, res) {
    let players = loadPlayerInfo();
    let i = players.findIndex(p => p.name == req.query.name);
    let updated = false;
    players.map(p => {
        if (p.name == req.query.name) {
            p.wins = req.query.wins
            p.cumulative_points = req.query.cumulative_points
            updated = true
        }
    })
    if (updated && writePlayerInfo(players, res)) {
        let player = new Player(req.query.name, req.query.wins, req.query.cumulative_points)
        console.log("Player updated.");
        res.status(200).send({message: "Player updated.", data: player});
    }
}

export function loadPlayerInfo() {
    let players = [];
    fs.readFileSync(player_data, "utf-8").split("|").forEach(function(line) {
        let line_info = line.split(";");
        let player = new Player(line_info[0], line_info[1], line_info[2]);
        players.push(player);
    });
    return players
}

const writePlayerInfo = (data, res) => {
    let file_data = "";
    data.forEach(p => {
        file_data += p.name + ";" + p.wins + ";" + p.cumulative_points + "|"
    });
    fs.writeFile(player_data, file_data.slice(0, -1), err => {
        if (err) {
            console.error("Error writting to file: ", err);
            res.status(500).send("Error writting to file.");
        }
    })
    return true;
}
