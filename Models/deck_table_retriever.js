
			db_connection.connection.query("SELECT deck_name FROM Decks", function(err, res) {
			    if (err) throw err;
			    for (let i in res)
			    	console.log(res[i].deck_name);


			    // db_connection.connection.end();
			});