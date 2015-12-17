module.exports = function( req, res, next ) {
	if (req.session.user) {
		req.session.logged_in = true;
	};
	console.log(req.session.user);
	res.locals.sess = req.session;
	next();
};
