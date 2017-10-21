let Deck = function (di) {
	this.cards = {};
	this.deck_id = di;
	this.all_flashcards_have_been_answered = false;
	this.number_of_flashcards_answered = 0;
}

Deck.prototype.flash_card_answered = function() {
	this.number_of_flashcards_answered++;
	if (this.number_of_flashcards_answered === Object.keys(this.cards).length){
		this.all_flashcards_have_been_answered = true;
	}
};


module.exports = {
	Deck: Deck
}