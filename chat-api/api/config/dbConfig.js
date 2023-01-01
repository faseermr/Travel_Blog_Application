const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "travel_blog",
  multipleStatements: true,
});

// test database connection
connection.connect((err) => {
  if (err) {
    console.log("Not connected");
  } else {
    console.log("Connected");
  }
});

module.exports = connection;
