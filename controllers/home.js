module.exports = function (app) {

	var User = app.models.users;

	var HomeController = {
		index : function (req, res) {
				res.render('home/index');
//			});
		}
	}

	return HomeController;
}