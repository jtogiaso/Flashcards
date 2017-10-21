let inquirer = require("inquirer");
let choices_array = [];
module.exports = {
	view_start: function(message , choices_array) {

		return  inquirer.prompt([
					    {
					    	type: "list",
							message: message,
							choices: choices_array,
							name: "user_action"
					    }
				]);
	}
}