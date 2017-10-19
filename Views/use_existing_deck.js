let inquirer = require("inquirer");
// let user_controller = require("../Controllers/user_controller.js");
module.exports = {
	start_view: function(deck_array , db_connection , deck_name_id_array) { 

		inquirer.prompt([
		    {
		      type: "list",
		      message: "Choose a deck: ",
		      choices: deck_array,
		      name: "user_choice"
		    }	
		])
		.then(function(response){
			let choice_index_id = deck_name_id_array[deck_array.indexOf(response.user_choice)];
			return choice_index_id;
		});
	}

}