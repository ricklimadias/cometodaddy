module.exports = function () {
	var mongoose = require('mongoose');
	var env_url = {
		"test": "mongodb://localhost/teste01",
		"development": "mongodb://localhost/teste01"
	};

	var url = env_url[process.env.NODE_ENV || "development"];
	return mongoose.createConnection(url);
}