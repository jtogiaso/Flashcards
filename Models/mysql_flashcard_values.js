

module.exports = {
	get_flashcard_values: function(deck_id , db_connection) {
		return new Promise (function (resolve , reject) {
			db_connection.query("select `front_value`,`back_value`,`deck_id`,`id` from `Cards`where `deck_id` = " + deck_id +";", function(err, res) {
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