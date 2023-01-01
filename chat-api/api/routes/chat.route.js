const express = require("express");
const router = express.Router();
const { getMessages } = require(`../controller/chat.controller`);

router.get(`/:sender/:reciever`, getMessages);

module.exports = router;
