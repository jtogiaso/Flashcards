let inquirer = require("inquirer");
let mysql = require("mysql");
let initial_entry_controller = require("../Controllers/initial_entry.js");
let db_connection = require("./../Models/db_connection.js");

db_connection.connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + db_connection.connection.threadId);
  // afterConnection();
});
// function afterConnection() {
//   db_connection.connection.query("SELECT * FROM golden_state_warriors_roster_cards", function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     // db_connection.connection.end();
//   });
// }

inquirer.prompt([
    {
      type: "list",
      message: "To begin choose one of the following: ",
      choices: ["Create new deck of flashcards" , "Use an alrady existing deck" , "Exit"],
      name: "user_choice"
    }	
])
.then(function(response){
	initial_entry_controller.entry_point_manage(response.user_choice , db_connection);
});