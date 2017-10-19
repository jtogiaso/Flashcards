let inquirer = require("inquirer");
let mysql = require("mysql");

let db_connection = require("./Models/db_connection.js");
let user_controller = require("./Controllers/user_controller.js");
db_connection.connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + db_connection.connection.threadId);
});

inquirer.prompt([
    {
      type: "list",
      message: "To begin choose one of the following: ",
      choices: ["Create new deck of flashcards" , "Use an alrady existing deck" , "Exit"],
      name: "user_choice"
    }	
])
.then(function(response){
	user_controller.entry_point_manage(response.user_choice , db_connection);
	// db_connection.connection.end();
});