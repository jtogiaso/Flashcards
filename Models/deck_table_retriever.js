let deck_name_array = [];
let deck_name_id_array = [];

module.exports = {
	get_deck_names: function(db_connection , cb) {
		db_connection.connection.query("SELECT * FROM Decks", function(err, res) {
			if (err){
				throw err;
			}
			for (let i in res) {
				deck_name_array.push(res[i].deck_name)
				deck_name_id_array.push(res[i].id);
			}
			deck_name_array.push("Exit");
			cb(deck_name_array , db_connection , deck_name_id_array);
		});	
	}
}