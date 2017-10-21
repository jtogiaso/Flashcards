

module.exports = {
	db_alter_flashcard: function(db_connection , fv , bv , id) {
		fv = "\"" + fv + "\"";
		bv = "\"" + bv + "\"";
		return new Promise (function (resolve , reject) {
			db_connection.query("update `cards` set `front_value`=" + fv + ",`back_value`=" + bv + " where `id`=" + id, function(err, res) {
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