

module.exports = {
	db_push_flashcard: function(db_connection , fv , bv , di) {
		fv = "\"" + fv + "\"";
		bv = "\"" + bv + "\"";
		return new Promise (function (resolve , reject) {
			db_connection.query("INSERT INTO `Cards` (`front_value` , `back_value` , `deck_id`) values ("+ fv +" , "+ bv +" , "+ di +")", function(err, res) {
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
