let inquirer = require("inquirer");
// let user_controller = require("../Controllers/user_controller.js");

module.exports = {
	get_all_cards_info: function(card_array, db_connection, cb) {
		inquirer.prompt([
		    {
		      type: "list",
		      message: "Choose a card at which0 to look: ",
		      choices: card_array,
		      name: "user_choice"
		    }	
		])
		.then(function(response){
			console.log(user_controller);
			return;
		});
	}
}
