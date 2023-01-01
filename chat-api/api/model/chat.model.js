const dbConn = require("../config/dbConfig");

exports.saveMessages = (data) => {
  // console.log("data : ", data);
  dbConn.query(
    `Insert into messages (message,reciever,sender) values(?,?,?)`,
    [data.message, data.reciever, data.sender],
    (err, res) => {
      if (err) {
        console.log(err);
        //result(err, res);
      } else {
        console.log(res);
        // result(null, res);
      }
    }
  );
};

exports.getMessages = (sender, reciever, result) => {
  dbConn.query(
    `Select * from messages where reciever =? and sender =? or sender =? and  reciever =?`,
    [reciever, sender, reciever, sender],
    (err, res) => {
      if (err) {
        //console.log(err);
        result(err, res);
      } else {
        //console.log(res);
        result(null, res);
      }
    }
  );
};
