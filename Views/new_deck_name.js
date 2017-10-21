let inquirer = require("inquirer");

module.exports = {
	view_start: function() {

		return  inquirer.prompt([
					    {
					    	type: "input",
							message: "What is the name of your new deck: ",
							name: "deck_new_name"
					    }
				])
	}
}