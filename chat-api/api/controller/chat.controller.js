const { saveMessages, getMessages } = require("../model/chat.model");

exports.saveMessages = (req, res) => {
  const msg = {
    message: req.body.message,
    reciever: req.body.reciever,
    sender: req.body.sender,
  };
  saveMessages(msg, (err, response) => {
    if (err) res.send(err);

    res.json({ response });
  });
};

exports.getMessages = (req, res) => {
  let { sender, reciever } = req.params;
  console.log(req.params);
  getMessages(sender, reciever, (err, response) => {
    if (err) res.send(err);

    res.json({ response });
  });
};
