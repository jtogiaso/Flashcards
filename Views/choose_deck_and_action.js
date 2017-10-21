let inquirer = require("inquirer");

module.exports = {
	view_start: function(deck_name_array) {

		return  inquirer.prompt([
					    {
					    	type: "list",
							message: "Chose a deck: ",
							choices: deck_name_array,
							name: "deck_choice"
					    },
					    {
					    	type: "list",
					    	message: "What would you like to do with this deck?",
					    	choices: ["Quiz yourself with these flashcards" , "Study flashcards" , "Add new flashcards" , "Edit flashcards" , "Exit"],
					    	name: "action"

					    }
				]);
	}
}