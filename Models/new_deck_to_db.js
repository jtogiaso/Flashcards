
module.exports = {
	db_push_new_deck:  function(db_connection , new_deck_name) {
		new_deck_name = "\'" + new_deck_name + "\'";
		let query = "INSERT INTO `Decks` (`deck_name`) values (" + new_deck_name + ")";
		return new Promise (function (resolve , reject) {
			db_connection.query(query, function(err, res) {
				if (err){
					reject(err);
				}
				else{
					resolve(res);
				}
			});
		});
	},
	get_new_deck_id: function(db_connection , new_deck_name){
		new_deck_name = "\'" + new_deck_name + "\'";
		let query = "SELECT `id` FROM `Decks` WHERE `deck_name`=" + new_deck_name;
		return new Promise (function (resolve , reject) {
			db_connection.query(query, function(err, res) {
				if (err){
					reject(err);
				}
				else{
					resolve(res);
				}
			});
		});

	}
}
