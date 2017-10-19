let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "UCSD0724",
  database: "flashcard_decks"
});

module.exports = {connection: connection};

