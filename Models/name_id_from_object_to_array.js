
module.exports = {
	get_array_of_names: function (deck_name_obj) {
		let deck_name_array = [];
		for (let i in deck_name_obj) {
			deck_name_array.push(deck_name_obj[i].deck_name);
		}
		return deck_name_array;
	}
}