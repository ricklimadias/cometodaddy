module.exports = function (app) {

	var Post = app.models.posts;
	var User = app.models.users;

	var PostController = {
		index : function (req, res) {
			var params = {};
			Post.find({}).sort({'updateAt': -1}).exec(function(err, posts){
				params = {
					posts : posts,
					tags : req.tags
				};
				res.render('posts/index', params);
			});
		},
		show: function (req, res) {
			var params = {};
			Post.findOne({_id : req.params.id}, function(err, post){
				User.findOne({_id : post.user}, function(err, user){
					if (err) {
						throw err;
					}else{
						params = {
							post : post,
							user : user,
							tags : req.tags
						};
                        console.log(post);
						res.render('posts/show', params);
					};
				})
			})
		},
		postar: function (req, res) {
			res.render('posts/new', {
				title : "Novo Pet",
				post : new Post({}),
				tags : ''
			});
		},
		create: function (req, res) {
			var query = req.body.post;
			query.user = req.session.user._id;
			Post.create(query, function (err, post) {
				if (err) {
					req,flash('error', "Alguns erros foram encontrados");
					res.redirect('/postar');
				} else {
					req.flash('success', "Operação realizada com sucesso");
					res.redirect('/post/'+post._id);
				};
			});
		},
		edit: function (req, res) {
			Post.findOne({_id : req.params.id}, function (err, post){
				res.render('posts/edit', {
					title: "Editar",
					post: post,
					tags : req.tags
				});
			})
		},
		update: function (req, res) {
			var id = req.params.id;
			var epost = req.body.post;
			
			Post.findOne({_id: id}, function (err, post){
				post.title = epost.title;
				post.body = epost.body;
				post.tags = epost.tags;
				post.updateAt = Date.now();
				
				post.save(function (err){
					if (err){ 
						req.flash('error', "Alguns erros encontrados");
						throw err;
					}else{
						req.flash('success', "Operação realizada com sucesso");
						res.redirect('/post/'+post._id);
					};
				});
			});
		},
		destroy: function (req, res) {
			var id = req.params.id;
			Post.remove({_id : id}, function (err) {
				if (err){
					throw err
					req.flash('error', "Operação não realizada")
				}else{
					req.flash('success', "Operação realizada com sucesso");
					res.redirect('/posts');
				};
			})
		},

		//Search
		search: function (req, res) {
			var terms = {title: { $regex: req.query.search, $options: 'i' }}
			Post.find(terms, function(err, posts){
				params = { 
					posts : posts,
					tags : req.tags
				};
				res.render('posts/index', params);
			});
		}
	}

	return PostController;
}