let card_array = [];

module.exports = {
	get_all_cards_info: function(db_connection , cb , table_name) {
		db_connection.connection.query("SELECT * FROM " +  , function(err, res) {
			if (err){
				throw err;
			}
			for (let i in res) {
				deck_name_array.push(res[i].deck_name);
			}
			deck_name_array.push("Exit");
			cb(deck_name_array , db_connection);
		});	
	}
}