const Redis = require("ioredis");

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

redis
  .ping()
  .then((result) => {
    console.log("Redis response:", result);
    redis.quit();
  })
  .catch((error) => {
    console.error("Redis connection failed:", error);
    redis.quit();
  });
  