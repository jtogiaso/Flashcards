let inquirer = require("inquirer");

module.exports = {
	view_start: function() {

		return  inquirer.prompt([
					    {
					    	type: "input",
							message: "What is the front value of this flash card: ",
							name: "front_value"
					    },
					    {
					    	type: "input",
							message: "What is the back value of this flash card: ",
							name: "back_value"
					    },
					    {
					    	type: "list",
							message: "Would you like to make another card: ",
							choices: ["Yes" , "No"],
							name: "make_another_card"
					    }
				]);
	}
}