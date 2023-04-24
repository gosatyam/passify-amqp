const { createClient } = require("redis");
const logger = require("./logger");

const client = createClient();
client.on("error", (err) => logger.error("Redis Client Error", err));
(async () => {
  await client.connect();
  logger.info("Redis connected");
})();

module.exports = client;
