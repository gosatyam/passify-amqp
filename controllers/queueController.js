const QueueService = require("../services/queueService");

class MessageController {
  async postMessage(req, res) {
    const { message } = req.body;
    if (!message) return res.status(400).json({ msg: "message not found" });
    const obj = new QueueService();
    const result = await obj.postMessage(message);
    if (result) return res.status(200).json({ result: "Success", result });
    else return res.status(400).json({ result: "Failed in sending message" });
  }

  async getMessage(req, res) {
    const { id } = req.query;
    if (!id) return res.status(400).json({ msg: "ID not found" });
    const obj = new QueueService();
    const respose = await obj.getMessage(id);
    if (!respose) return res.status(400).json({ message: "error" });
    return res.status(200).json(respose);
  }
}

module.exports = MessageController;
