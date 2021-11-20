const express = require("express");
const redis = require("redis");

const app = express();
app.use(express.json());
const client = redis.createClient({ host: "redis-abc", port: 6379 });

//Set initial visits
client.set("visits", 0);

//defining the root endpoint
app.post("/vote", (req, res) => {
  const payload = req.body;
  client.get(payload.name, (err, count) => {
    console.log(`${payload.name} - ${count}`);
    if (!count) {
      count = 0;
    }
    const newCount = (parseInt(count) + 1).toString();
    console.log(`New Count - ${newCount}`);
    client.set(payload.name, newCount, (err, reply) => {
      console.log(reply);
      res.send(newCount);
    });
  });
});

app.get("/vote", (req, res) => {
  const payload = req.query;
  client.get(payload.name, (err, count) => {
    res.send(count);
  });
});

//specifying the listening port
app.listen(8081, () => {
  console.log("Listening on port 8081");
});
