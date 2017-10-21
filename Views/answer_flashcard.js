let inquirer = require("inquirer");

module.exports = {
	view_start: function(message) {

		return  inquirer.prompt([
					    {
					    	type: "input",
							message: "Type in your answer for -> " + message + ": ",
							name: "answer"
					    }
				]);
	}
}