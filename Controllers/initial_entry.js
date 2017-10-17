let inquirer = require("inquirer");
let mysql = require("mysql");
let use_existing_deck = require("../Views/use_existing_deck.js");
let deck_table_retriever = require("../Models/deck_table_retriever.js")


module.exports = {
	entry_point_manage: function(user_action_choice , db_connection) {
		if (user_action_choice === "Create new deck of flashcards"){
			console.log("You should be taken to create a new deck of flash cards!");
		}
		else if(user_action_choice === "Use an alrady existing deck"){
			deck_table_retriever(db_connection);
		}
		else {
			console.log("exit!!!");
		}
	}
}