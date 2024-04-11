import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("OK");
});

import playerRouter from './src/routes/player.route.js';
import leaderboardRouter from './src/routes/leaderboard.route.js';

app.use("/player", playerRouter);
app.use("/leaderboard", leaderboardRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})