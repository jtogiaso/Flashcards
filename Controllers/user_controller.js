let use_existing_deck = require("../Views/use_existing_deck.js");
let deck_table_retriever = require("../Models/deck_table_retriever.js");
let flash_card_creator = require("../Models/flash_card_creator.js");
// let cards_retriever = require("../Models/cards_retriever.js");

module.exports = {
	entry_point_manage: function(user_action_choice , db_connection) {
		if (user_action_choice === "Create new deck of flashcards"){
			console.log("You should be taken to create a new deck of flash cards!");
		}
		else if(user_action_choice === "Use an alrady existing deck"){
			return deck_table_retriever.get_deck_names(db_connection , use_existing_deck.start_view);
		}
		else {
			console.log("Thank you for your patronage. Come back again!");
			db_connection.connection.end();
		}
	},
	existing_deck_choices: function(deck_name , db_connection , deck_name_id_array){
		return cards_retriever.get_all_cards_info(user_action_choice , db_connection);
	}
}