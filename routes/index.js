const express = require("express");
const route = express.Router();
const QueueController = require("../controllers/queueController");

const queObj = new QueueController();

route.get("/queue/get", queObj.getMessage);
route.post("/queue/postmessage", queObj.postMessage);

module.exports = route;
