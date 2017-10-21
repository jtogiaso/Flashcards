let deck_names = require("../Models/deck_names.js");
let choose_deck_and_action = require("../Views/choose_deck_and_action.js");
let connection = require("../Models/db_connection.js");
let nifota = require("../Models/name_id_from_object_to_array.js");
let cards = require("../Models/cards.js");
let mysql_flashcard_values = require("../Models/mysql_flashcard_values.js");
let quiz = require("../Views/quiz.js");
let answer_flashcard = require("../Views/answer_flashcard.js");
let deck = require("../Models/deck.js");
let new_flashcard = require("../Views/new_flashcard.js");
let new_flashcard_to_db = require("../Models/new_flashcard_to_db.js");
let alter_card = require("../Models/alter_card.js");
let new_deck_name = require("../Views/new_deck_name.js");
let new_deck_to_db = require("../Models/new_deck_to_db.js");




module.exports = {
	decks_name_array_of_objects: [],
	deck: {},
	user_chosen_action: "",
	current_card: 1,
	choices_array: [],
	start_connection: function(){
		connection.connect(function(err) {
		  if (err) {
		  	throw err;
		  };
		  // console.log("connected as id " + connection.threadId);
		});
	},
	initial_navigation: function(first_promise) {
		let scope = this;
		first_promise().
			then(function(value){
				if(value.user_choice === "Create new deck of flashcards") {
					scope.start_new_deck();
				}
				else if (value.user_choice === "Use an alrady existing deck"){
					scope.deck_names_get();
				}
				else {
					console.log("Thank you for your patronage. Come back again!");
					connection.end();
				}
			})
			.catch(function(err){
				console.log(err);
				connection.end();
			})
		;
	},
	deck_names_get: function (){
		let scope = this;
		deck_names.get_deck_names(connection)
			.then(function(res){
				if (res.length > 0){
					scope.decks_name_array_of_objects = res;
					scope.choose_deck_view(res);
				}
				else{
					console.log("There are no decks! Make one ->");
					scope.start_new_deck();
				}
			})
			.catch(function(err){
				console.log(err);
				connection.end();
			})
		;
	},
	choose_deck_view: function(res){
		let scope = this;
		choose_deck_and_action.view_start(nifota.get_array_of_names(res))
			.then(function(response){
				let chosen_deck_id = 0;
				scope.user_chosen_action = response.action;
				for (let i in scope.decks_name_array_of_objects){
					if (scope.decks_name_array_of_objects[i].deck_name === response.deck_choice){
						chosen_deck_id = scope.decks_name_array_of_objects[i].id;
					}
				}
				scope.deck = new deck.Deck(chosen_deck_id);
				scope.get_card_values(chosen_deck_id);
			})
			.catch(function(err){
				console.log(err);
				connection.end();
			})
		;
	},
	get_card_values: function(deck_id){
		let scope = this;
		mysql_flashcard_values.get_flashcard_values(deck_id , connection)
			.then(function(response){
				if(response.length === 0){
					console.log("There are no flashcards in this deck! Now make some!");
					scope.user_chosen_action = "Add new flashcards";
					scope.add_flashcard();
				}
				else{
					scope.deck_stacker_and_card_creation(response);
				}
			})
			.catch(function(err){
				console.log(err);
				connection.end();
			})
		;
	},
	deck_stacker_and_card_creation: function(flashcards_object){
		let current_id = 1;
		for (let i in flashcards_object) {
			//" " "  Constuctor " " "
			this.deck.cards[current_id] = new cards.Flashcard(flashcards_object[i].front_value , flashcards_object[i].back_value , flashcards_object[i].id);
			current_id++;
		}

		if (this.user_chosen_action === "Quiz yourself with these flashcards"){
			this.choices_array = ["Answer" , "Next" , "Exit"];
			this.quizzer();
		}
		else if (this.user_chosen_action === "Study flashcards"){
			this.choices_array = ["Flip" , "Next" , "Exit"];
			this.study(this.deck.cards[this.current_card].front_value);
		}
		else if (this.user_chosen_action === "Add new flashcards"){
			this.add_flashcard();
		}
		else if (this.user_chosen_action === "Edit flashcards"){
			this.choices_array = ["Edit" , "Next" , "Exit"];
			this.edit_flashcard();
		}
		else{
			console.log("Thank you for your patronage. Come back again!");
			connection.end();
		}	
	},
	quizzer: function(){
		let scope = this;
		if (!this.deck.all_flashcards_have_been_answered){
			 if (!this.deck.cards[this.current_card].has_been_answered_correctly){
 			 	let message = this.deck.cards[this.current_card].front_value;
 				quiz.view_start(message , this.choices_array)
 					.then(function(res){
 						if (res.user_action === "Answer"){
 							scope.answer_quizzer();
 						}
 						else if (res.user_action === "Next"){
 							scope.next_flashcard();
 							scope.quizzer();
 						}
 						else {
 							console.log("Thank you for your patronage. Come back again!");
 							connection.end();
 						}
 					})
					.catch(function(err){
						console.log(err);
						connection.end();
					})
 				;
			 }
			else {
				scope.next_flashcard();
				scope.quizzer();
			}
		}
		else{
			console.log("You have answered all of the flashcards in this deck.");
			this.deck.cards = {};
			this.deck_names_get();
		}
	},
	answer_quizzer: function() {
		let scope = this;
		answer_flashcard.view_start(this.deck.cards[this.current_card].front_value)
			.then(function(res){
				if(res.answer.toLowerCase() === scope.deck.cards[scope.current_card].back_value.toLowerCase()){
					console.log("You got it right!!!");
					scope.deck.cards[scope.current_card].answered_correctly();
					scope.deck.flash_card_answered();
					scope.next_flashcard();
					scope.quizzer();
				}
				else{
					console.log("Eeeeehhh!!! Wrong!");
					scope.deck.cards[scope.current_card].guessed_incorrectly();
					scope.quizzer();
				}
			})
			.catch(function(err){
				console.log(err);
				connection.end();
			})
		;
	},
	study: function(message){
		let scope = this;
		quiz.view_start(message , this.choices_array)
			.then(function(res){
				if (res.user_action === "Flip"){
					if (message === scope.deck.cards[scope.current_card].front_value) {
						scope.study(scope.deck.cards[scope.current_card].back_value)
					}
					else{
						scope.study(scope.deck.cards[scope.current_card].front_value)	
					}
				}
				else if (res.user_action === "Next"){
					scope.next_flashcard();
					scope.study(scope.deck.cards[scope.current_card].front_value);
				}
				else {
					console.log("Thank you for your patronage. Come back again!");
					connection.end();
				}
			})
			.catch(function(err){
				console.log(err);
			})
		;		
	},
	add_flashcard: function(){
		let scope = this;
		new_flashcard.view_start()
			.then(function(res){
				if (scope.user_chosen_action === "Add new flashcards"){
					scope.db_add_flashcard(res.front_value , res.back_value);
					if(res.make_another_card === "Yes"){
						scope.add_flashcard();
					}
					else{
						console.log("Thank you for your patronage. Come back again!");
						connection.end();
					}
				}
				else if (scope.user_chosen_action === "Edit flashcards"){
					scope.alter_card_in_db(res.front_value , res.back_value);
					if(res.make_another_card === "Yes"){
						scope.edit_flashcard();
					}
					else{
						console.log("Thank you for your patronage. Come back again!");
						connection.end();
					}
				}
			})
			.catch(function(err){
				console.log(err);
				connection.end();
			})
		;
	},
	next_flashcard: function(){	
		if (this.current_card === Object.keys(this.deck.cards).length){
			this.current_card = 1;
		}
		else {
			this.current_card++;
		}
	},
	db_add_flashcard: function(fv , bv){
		let scope = this;
		new_flashcard_to_db.db_push_flashcard(connection , fv , bv , this.deck.deck_id)
			.catch(function(err){
				console.log(err);
				connection.end();
			})
		;
	},
	edit_flashcard: function(){
		let scope = this;
		let message = "Front Value: " + this.deck.cards[this.current_card].front_value  + ". Back Value: " + this.deck.cards[this.current_card].back_value;
		quiz.view_start(message , this.choices_array)
			.then(function(res){
				if (res.user_action === "Edit"){
					scope.add_flashcard();
				}
				else if (res.user_action === "Next"){
					scope.next_flashcard();
					scope.edit_flashcard();
				}
				else {
					console.log("Thank you for your patronage. Come back again!");
					connection.end();
				}
			})
			.catch(function(err){
				console.log(err);
			})
		;		
	},
	alter_card_in_db: function(fv , bv){
		let scope = this;
		alter_card.db_alter_flashcard(connection , fv , bv , this.deck.cards[this.current_card].id)
			.catch(function(err){
				console.log(err);
				connection.end();
			})
		;
	},
	start_new_deck: function(){
		let scope = this;
		new_deck_name.view_start()
			.then(function(res){
				scope.deck_name_to_db(res.deck_new_name);
			})
			.catch(function(err){
				console.log(err);
				connection.end();
			})
		;
	},
	deck_name_to_db: function(nDeckName){
		let scope = this;
		new_deck_to_db.db_push_new_deck(connection , nDeckName)
			.catch(function(err){
				console.log(err);
				connection.end();
			})
		;
		new_deck_to_db.get_new_deck_id(connection , nDeckName)
			.then(function(res){
				scope.deck = new deck.Deck(res[0].id);
				scope.user_chosen_action = "Add new flashcards";
				scope.add_flashcard();
			})
			.catch(function(err){
				console.log(err);
				connection.end();
			})
		;
	}
};