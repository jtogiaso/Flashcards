let Flashcard = function (fv , bv , identification) {
		this.front_value = fv;
		this.back_value = bv;
		this.has_been_answered_correctly = false;
		this.total_number_of_incorrect = 0;
		this.id = identification;
}

Flashcard.prototype.answered_correctly = function() {
	this.has_been_answered_correctly = true;
};

Flashcard.prototype.guessed_incorrectly = function() {
	if (this.has_been_answered_correctly === false){
		this.total_number_of_incorrect++;
	}
};


module.exports = {
	Flashcard: Flashcard
}