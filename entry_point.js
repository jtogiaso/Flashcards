let inquirer = require("inquirer");
let flashcard_choice = require("./Controllers/flashcard_choice.js");

let initial_prompt = function () {
	return inquirer.prompt([
	    {
	      type: "list",
	      message: "To begin choose one of the following: ",
	      choices: ["Create new deck of flashcards" , "Use an alrady existing deck" , "Exit"],
	      name: "user_choice"
	    }
	]);
};


flashcard_choice.start_connection();
flashcard_choice.initial_navigation(initial_prompt);