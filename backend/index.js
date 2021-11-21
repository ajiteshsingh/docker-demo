const express = require("express");
const redis = require("redis");
var cors = require('cors')

const app = express();
const redisClient = redis.createClient({ host: "redis-abc", port: 6379 });
app.use(express.json());
app.use(cors())

//Set initial visits
redisClient.set("visits", 0);

//defining the root endpoint
app.post("/vote", (req, res) => {
  const payload = req.body;
  const teamName = payload.name
  redisClient.get(teamName, (err, count) => {
    console.log(`${teamName} - ${count}`);
    if (!count) {
      count = 0;
    }
    const newCount = (parseInt(count) + 1).toString();
    console.log(`New Count - ${newCount}`);
    redisClient.set(teamName, newCount, (err, reply) => {
      console.log(reply);
      res.send(newCount);
    });
  });
});

app.get("/", (req, res) => {
  res.send('Hello');
});

app.get("/vote", (req, res) => {
  const payload = req.query;
  redisClient.get(payload.name, (err, count) => {
    if (!count) {
      count = "0";
    }
    res.send(count);
  });
});

//specifying the listening port
app.listen(8081, () => {
  console.log("Listening on port 8081");
});
