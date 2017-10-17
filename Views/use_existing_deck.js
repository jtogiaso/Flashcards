let inquirer = require("inquirer");
let initial_entry_controller = require("../Controllers/initial_entry.js");

module.exports = {
	deck_array: [],

	start_view: function() { 

		inquirer.prompt([
		    {
		      type: "list",
		      message: "Choose a deck: ",
		      choices: this.deck_array,
		      name: "user_choice"
		    }	
		])
		.then(function(response){
			

		});
	}

}