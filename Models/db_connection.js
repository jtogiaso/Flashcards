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

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//   // afterConnection(); 
// });



// function afterConnection() {
//   connection.query("SELECT * FROM golden_state_warriors_roster_cards", function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// }

module.exports = {connection: connection};

