

module.exports = {
	get_deck_names: function(db_connection) {
		return new Promise (function (resolve , reject) {
			db_connection.query("SELECT id, deck_name FROM Decks", function(err, res) {
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