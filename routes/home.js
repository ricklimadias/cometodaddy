module.exports = function (app) {
	var home = app.controllers.home;
	var authentication = require('../middleware/authentication');
	var logged = require('../middleware/logged');
	

	app.get('/', logged, home.index);
	
	
	
}