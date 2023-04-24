const QueueService = require("../services/queueService");

class MessageController {
  async postMessage(req, res) {
    const { message } = req.body;
    if (!message) return res.status(400).json({ msg: "message not found" });
    const obj = new QueueService();
    await obj.postMessage(message);
    return res.status(200).json({ result: "Success" });
  }

  async getMessage(req, res) {
    const { id } = req.query;
    if (!id) return res.status(400).json({ msg: "ID not found" });
    const obj = new QueueService();
    const respose = await obj.getMessage(id);
    return res.status(200).json(respose);
  }
}

module.exports = MessageController;
