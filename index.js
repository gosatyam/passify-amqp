const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const amqplib = require("amqplib");
const { v4: uuidv4 } = require("uuid");
const app = express();
const redisCon = require("./libs/redis");
const logger = require("./libs/logger");
const routes = require("./routes/index");
const queue = process.env.QUEUE_NAME;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const receiveFunc = async () => {
  try {
    const conn = await amqplib.connect(process.env.AMQP_URL);
    if (conn) logger.info("RECEIVER: server connected");

    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);
    ch1.consume(queue, async (msg) => {
      if (msg !== null) {
        ch1.ack(msg);
        const uid = uuidv4();
        const message = { type: "RECEIVE", message: msg.content.toString() };
        await redisCon.set(uid, JSON.stringify(message));
        logger.info(`RECEIVER: ${uid} : ${message}}`);
      } else {
        logger.error("RECEIVER: Consumer cancelled by server");
      }
    });
  } catch (err) {
    logger.error(err);
  }
};
// receiveFunc();

app.get("/", (req, res) => {
  res.send("<h1>Server Up!</h1>");
});
app.use("/v1", routes);

const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Passify server up on port ${port}`);
});
