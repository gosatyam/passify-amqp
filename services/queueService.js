const amqplib = require("amqplib");
const { v4: uuidv4 } = require("uuid");
const logger = require("../libs/logger");
const redisCon = require("../libs/redis");

const queue = process.env.QUEUE_NAME;

class QueueService {
  async postMessage(message) {
    try {
      const conn = await amqplib.connect(process.env.AMQP_URL);
      if (conn) logger.info("SENDER: server connected");
      const ch2 = await conn.createChannel();
      ch2.sendToQueue(queue, Buffer.from(message));
      const uid = uuidv4();
      message = { type: "SEND", message };
      await redisCon.set(uid, JSON.stringify(message));
      logger.info(`SENDER: ${uid} : ${message}`);
      return uid;
    } catch (err) {
      logger.error("SENDER: error in posting message", err);
      return false;
    }
  }

  async getMessage(key) {
    try {
      const value = await redisCon.get(key);
      return value;
    } catch (err) {
      logger.error("SENDER: error in getting message", err);
      return false;
    }
  }
}

module.exports = QueueService;
