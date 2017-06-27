require('locus')
var fs = require('fs');

exports.install = function() {
	F.route('/', view_index);	

	F.route('/users', view_users, ['get']);
	F.route('/usersData', get_users, ['get']);
	F.route('/users/{id}', view_user, ['get']);
	F.route('/userData/{id}', get_user, ['get']);
	F.route('/users', post_users, ['post']);
	F.route('/users/{id}/edit', edit_user, ['post']);
	F.route('/users/{id}/delete', delete_user, ['post']);
	
	F.route('/producers', view_producers, ['get']);
	F.route('/producers/{id}', view_producer, ['get']);
	F.route('/producers/{id}/edit', edit_producer, ['get']);
	F.route('/producers/{id}/edit', post_edit_producer, ['post', 'upload'], 5000);
	F.route('/producersData', get_producers, ['get']);
	F.route('/producers', post_producers, ['post', 'upload'], 5000);
	F.route('/producers/{id}/delete', delete_producer, ['post']);
	
	F.route('/products', view_products, ['get']);
	F.route('/products/query/{category}', get_products, ['get']);
	F.route('/products', post_products, ['post', 'upload'], 5000);
	F.route('/products/{id}', view_product, ['get']);
	F.route('/products/{id}/edit', edit_product, ['get']);
	F.route('/products/{id}/edit', post_edit_product, ['post', 'upload'], 5000);
	F.route('/products/{id}/delete', delete_product, ['post']);
	
	F.route('/test', test);
	F.route('/test', test_post, ['post', 'upload'], 5000);


};

function test() {
	var self = this;
	// eval(locus)

	self.view('test');
}

function test_post() {
	var self = this,
	files = self.files;

	console.log('files: ', files)

	// eval(locus)

	files.forEach(function(el, i) {
		var newPath = 'public/u/producer_img/temp/' + 'temp_' + i + '.png' ;

		fs.rename(el.path, newPath, function(err) {
			if (err) return console.error(err)
			console.log('file uploaded!')
		})		
	})


	self.view('test');
}




function view_index() {
	var self = this;
	var response = {
		message: 'Sorry, we had trouble retreiving your information'
	};

	DB('ao', function(err, client, done) {
		client.query('SELECT * FROM products', function(err, result) {
			// done();

			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				response['products'] = result.rows;
				// console.log('products: ', result.rows)
			}
			
			client.query('SELECT * FROM users', function(err, result) {
				done();

				if(err != null) {
					self.throw500(err);
					return;
				}
				else {
					response['users'] = result.rows;
				}
				
				console.log('response: ', response.products)
				self.view('index', response);
			})
		})

	})


}

		// USERS

function view_users() {
	var self = this;

	DB('ao', function(err, client, done) {
	// var response = {
	// 	success:false,
	// 	wait:false,
	// 	message: 'Sorry, an unkown error has occurred'
	// }

		client.query("select * from users ORDER BY id", function(err, result) {
			done();

			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				// response.row = result
				console.log('here!!!', result)
				self.view('users', result.rows);
			}
		});

	})
	
}

function view_user() {

}


function get_users() {
	var self = this;
// console.log('JUST!!!!!!!!')
	DB('ao', function(err, client, done) {
	// var response = {
	// 	success:false,
	// 	wait:false,
	// 	message: 'Sorry, an unkown error has occurred'
	// }

		var x = client.query("select * from users", function(err, result) {
			done();

			if(err != null) {
				self.throw500(err);
				return;
			}

			// response.row = result
			console.log('here!!!', result)
			self.json(result)
		});

		// console.log('x: ', x)
	})
	
}

function get_user() {
	var self = this;
	console.log('self: ', self.req.path)
	var id = self.req.path[1]

	DB('ao', function(error, client, done) {

		client.query('SELECT * FROM users WHERE id=' + id, function(err, result) {
			done();

			if (err != null) {
				self.throw500(err);
				return;
			}
			else {
				self.json(result.rows)
			}
			console.log('result: ', result)
		})
	})
}

function post_users() {
	var self = this;
	var formData = self.body;


	// formData['firstName'] - self.body['first name'];
	// formData['lastName'] - self.body['last name'];
	// formData['role'] - self.body['role'];


	console.log('formData: ', formData, 'first_name: ', formData.first_name)
	




	DB('ao', function(err,client, done) {
		client.query('INSERT INTO users (first_name, last_name, role) VALUES ($1, $2, $3)', [formData.first_name, formData.last_name, formData.role], function(err,result) {
			done();

			if(err != null) {
				self.throw500(err);
				return;
			}
			else {

				console.log('posting user: ', result.rows[0])
				self.redirect('/users');
			}

		})
	})
}

function edit_user() {
	var self = this,
	formData = self.body;
	
	console.log('self: ', formData)

	DB('ao', function(err, client, done) {
		client.query('UPDATE users SET first_name= $1, last_name= $2, role= $3 WHERE id= $4', [formData.first_name, formData.last_name, formData.role, formData.id], function(err, result) {
			done();

			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				self.redirect('/users');
			}
		})
	})
}

function delete_user() {
	var self = this,
	id = self.req.path[1],
	message = 'User has been deleted.';

	console.log('self: ', self.req.path)
	
	DB('ao', function(err, client, done) {
		client.query('DELETE FROM users WHERE id=' + id, function(err, result) {
			done();
			
			self.redirect(self.req.headers.referer)
		})
	})
}

		//	PRODUCERS

function view_producers() {
	var self = this;
// console.log('here123')
	
	DB('ao', function(err, client, done) {
		client.query('SELECT * FROM producers ORDER BY id', function(err, result) {
			done();

			console.log('result!!: ', result.rows)
			self.view('producers', result.rows);
		})
	})

}


function get_producers() {
	var self = this;
	DB('ao', function(err, client, done) {
	// var response = {
	// 	success:false,
	// 	wait:false,
	// 	message: 'Sorry, an unkown error has occurred'
	// }

		var x = client.query("select * from producers", function(err, result) {
			done();

			if(err != null) {
				self.throw500(err);
				return;
			}

			// response.row = result
			console.log('here!!!', result)
			self.json(result)
		});
	})
	
}

function post_producers() {
	var self = this,
		formData = self.body,
		imgs = self.files || [];

	console.log('formData: ', formData)
	console.log('img: ', imgs)

	

	DB('ao', function(err,client, done) {

// MOVE IMAGES TO TEMPORARY LOCATION
		imgs.forEach(function(el, i) {
			var newPath = 'public/u/producer_img/temp/' + i;

			fs.rename(el.path, newPath, function(err) {
				if (err) return console.error(err)
				console.log('file uploaded!')
			})		
		})


// INSERT ITEMS INTO DB
		client.query('INSERT INTO producers (name, company_name, img_count, bio, goal, f_artists, zodiac, f_color, f_movie, f_book, f_season, f_music) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id;', [formData.name, formData.company, imgs.length, formData.bio, formData.goal, formData.f_artists, formData.zodiac, formData.f_color, formData.f_movie, formData.f_book, formData.f_season, formData.f_music], function(err,result) {
				done();
			
// 	RETRIEVE ID'
// eval(locus)
			var id = result.rows[0].id
			var dir = 'public/u/producer_img/' + id;

// MAKE NEW FOLDER FOR PRODUCER FOR IMAGES
			fs.mkdir(dir, function(err) {
				console.log('made directory: ', id)
			})
			
// MOVE IMAGES TO PERMANENT LOCATION
			imgs.forEach(function(el, i) {
				var oldPath = 'public/u/producer_img/temp/' + i;
				var newPath = 'public/u/producer_img/' + id + '/' + i + '.png';
// eval(locus)
				fs.rename(oldPath, newPath, function(err) {
					if (err) return console.error(err)
					console.log('file uploaded!')
				})			
			})

			if(err != null) {
				self.throw500(err);
				return;
			}
			else {


				self.redirect('/producers');
			}
		})
	})
}

function view_producer() {
	var self = this;

	console.log('req: ', self.req.path[1]);

	var pid = self.req.path[1];

	var response = {
		success:false,
		wait:false,
		message: 'Sorry, an unkown error has occurred'
	}


	DB('ao', function(err, client, done) {
		client.query('SELECT p.id AS id, p.name AS name, p.producer_id, p.description, p.price, c.id AS c_id, c.name AS c_name, c.img_count AS c_img_count, c.bio FROM products AS p FULL OUTER JOIN producers AS c ON p.producer_id = c.id WHERE c.id =' + pid +'ORDER BY p.id', function(err, result) {
				done();

console.log('here: ', result.rows[0].id)
				if(err != null) {
					self.throw500(err);
					return;
				}
				else if(result.rows[0].id > 0) {
					response.success = true;
					response.message = 'success';

				}
				else {
					response.success = false;
					response.message = 'Sorry, there are currently no items by this producer.'
				}

				console.log('producer search: ', result.rows)
				response.data = result.rows;
				self.view('producer', response)
		})
	})

}

function edit_producer() {
	var self = this,
	 id = self.req.path[1];



	DB('ao', function(err, client, done) {
		client.query('SELECT * FROM producers WHERE id=' + id, function(err, result) {
			done();
			
			if (err != null) {
				self.throw500(err);
				return;
			}
			else {
				self.view('edit_producer', result.rows[0])
			}
		})
	})
}

function post_edit_producer() {
	var self = this,
		id = self.req.path[1],
		formData = self.body,
		imgs = self.files || '',
		dir = 'public/u/producer_img/'+id;
	
	// fs.stat(dir, function(err, stats) {
 //      	eval(locus)
 //    //Check if error defined and the error code is "not exists"
 //    if (err && err.errno === 34) {
 //      //Create the dir, call the callback.
 //      fs.mkdir(dir, function(err) {
	// 			imgs.forEach(function(el, i) {
	// 				// var oldPath = 'public/u/producer_img/temp/' + i;
	// 				var newPath = 'public/u/producer_img/' + id + '/' + i + '.png';

	// 				fs.rename(el.path, newPath, function(err) {
	// 					if (err) return console.error(err)
	// 					console.log('file uploaded!')
	// 				})			
	// 			})
 //      });
	// 	}
	// 	else {
	// 		eval(locus)
	// 		imgs.forEach(function(el, i) {
	// 			// var oldPath = 'public/u/producer_img/temp/' + i;
	// 			var newPath = 'public/u/producer_img/' + id + '/' + i + '.png';

	// 			fs.rename(el.path, newPath, function(err) {
	// 				if (err) return console.error(err)
	// 				console.log('file uploaded!')
	// 			})			
	// 		})
	// 	}
	// })
	console.log('-----', fs.stat(dir))
	
	fs.mkdir(dir, function(err) {
		imgs.forEach(function(el, i) {
			// var oldPath = 'public/u/producer_img/temp/' + i;
			var newPath = 'public/u/producer_img/' + id + '/' + i + '.png';

			fs.rename(el.path, newPath, function(err) {
				if (err) return console.error(err)
				console.log('file uploaded!')
			})			
		})
	})

	DB('ao', function(err, client, done) {
		client.query('UPDATE producers SET name=$1, company_name=$2, bio=$3, goal=$4, f_artists=$5, zodiac=$6, f_color=$7, f_movie=$8, f_book=$9, f_season=$10, f_music=$11, img_count=$12 WHERE id=' + id, [formData.name, formData.company, formData.bio, formData.goal, formData.f_artists, formData.zodiac, formData.f_color, formData.f_movie, formData.f_book, formData.f_season, formData.f_music, imgs.length],function(err, result) {
			done();
			
			if (err != null) {
				self.throw500(err);
				return;
			}
			else {
				self.redirect('/producers')
			}
		})
	})
}

function delete_producer() {
	var self = this,
	id = self.req.path[1],
	message = 'Producer has been deleted.';

	console.log('self: ', self.req.path)
	
	DB('ao', function(err, client, done) {
		client.query('DELETE FROM producers WHERE id=' + id, function(err, result) {
			done();
			
			self.redirect(self.req.headers.referer)
		})
	})
}


	// PRODUCTS

function view_products() {
	var self = this;
	
	var response = {
		success:false,
		wait:false,
		message: 'Sorry, an unkown error has occurred'
	}
	
	DB('ao', function(err, client, done) {

		client.query("SELECT * FROM products ORDER BY id DESC LIMIT 10", function(err, result) {

			if(err != null) {
				self.throw500(err);
				return;
			}
			else if(result.rows[0].id > 0) {
				response.success = true;
				response.message = '';
				response.p_data = result.rows;

				console.log('products search: ', result.rows)
			}
			

				client.query("SELECT * FROM producers", function(err, result) {
					done();

					if(err != null) {
						self.throw500(err);
						return;
					}
					else if(result.rows[0].id > 0) {
						response.success = true;
						response.message = '';
						response.c_data = result.rows;

						console.log('producer search: ', result.rows)
						console.log('response: ', response)
						self.view('products', response)
					}
				});

		});



	})
	
}

function view_product() {
	var self = this,
		id = self.req.path[1],
		response = {
			success: false,
			message: ''
		};

	DB('ao', function(err, client, done) {
		client.query('SELECT * FROM products WHERE id=' + id, function(err, result) {
			// done();

			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				var pid = result.rows[0].producer_id;
				
				console.log('result: ', result.rows[0])
				response.p_data = result.rows[0];

// eval(locus)
				client.query("SELECT * FROM producers WHERE id=" + pid, function(err, result) {
					// done();

					console.log('result: ', pid, result.rows)
					if(err != null) {
						self.throw500(err);
						return;
					}
					else if(result.rows[0].id > 0) {
						response.success = true;
						response.message = '';
						response.c_data = result.rows[0];
						
						client.query('SELECT * FROM products WHERE producer_id=' + pid, function(err, result) {
							done();

							if(err != null) {
								self.throw500(err);
								return;
							}
							else {
								response.o_data = result.rows;

								// console.log('producer search: ', result.rows)
								console.log('response: ', response)
								self.view('product2', response)								
							}
						})					
					}
				});

			}
		})

		//possibly also add other work by this producer !!!!!!!!!!

	})
}

function get_products() {
	var self = this,
		tag = self.req.path[2];

	DB('ao', function(err, client, done) {
		client.query("SELECT * FROM products WHERE tags LIKE '%" + tag + "%'", function(err, result) {
			done();

			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				// eval(locus)
				console.log("!!!___!!!", tag, result)
				self.json(result.rows)
			}
		});
	})
	
}


function post_products() {
	var self = this,
	formData = self.body,
	imgs = self.files || [],
	tags = '',
	imgPaths = [];

// eval(locus)

	if( !formData.tags  ) {
		formData.tags = [];
	}
	else if(formData.tags.length == 1) {
		formData.tags = [formData.tags];
	}
	else {
		formData.tags = formData.tags.split(' ');
	}
	// console.log('formData: ', formData, 'tags: ', formData['tags'], typeof(formData.tags))

	console.log('imgs: ', imgs)

//	SAVE IMAGES FROM TEMP TO PUBLIC
	imgs.forEach(function(el, i) {
		var newPath = 'public/u/product_img/temp/'+ i +'.png';

		imgPaths.push(newPath);

		fs.rename(el.path, newPath, function(err) {
			if (err) return console.error(err)
			console.log('file uploaded!')
		})		
	})
//	INSERT PRODUCT
	DB('ao', function(err,client, done) {
		client.query('INSERT INTO products (name, producer_id, description, price, external_link, notes, img_count) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [formData.name, +formData.producer, formData.description, +formData.price, formData.external_link, formData.notes, imgs.length], function(err,result) {


console.log('typeof: ', typeof(formData.name), typeof(+formData.producer), typeof(formData.description), typeof(+formData.price), typeof(formData.external_link), typeof(formData.notes))
console.log('data: ', formData.name, +formData.producer, formData.description, +formData.price, formData.external_link, formData.notes)
console.log('result: ', result.rows)
console.log('tags: ', typeof(formData.tags), formData.tags)


			if(err != null) {
				console.log('--- In 500 error ---')
				self.throw500(err);
				return;
			}
			else {
				console.log('--- In success ---')

				var id = result.rows[0].id,
					model = result.rows[0],
					q = 'INSERT INTO product_tag (product_id, tag_id) VALUES',
					v = [],
					count = 1,
					tag,
					dir = 'public/u/product_img/' + id;

console.log('id: ', id, 'imgs: ', imgs, imgPaths)

//	MAKE A NEW FOLDER FOR FORDUCT IMAGES
				fs.mkdir(dir, function(err) {
					console.log('made directory: ', id)
					
	// SAVE IMAGES FROM TEMP NAME AND LOCATION TO NAME WITH 'ID' 
					imgPaths.forEach(function(el, i) {
						var newPath = 'public/u/product_img/'+ id + '/' +i +'.png';;
						fs.rename(el, newPath, function(err) {
							if (err) return console.error(err)
							console.log('file uploaded!')
						})
					})
				})


//	INSERTING TAGS
console.log('formData: ', formData )

				formData.tags.forEach(function(el, i) {
					q = q + ' (' + id + ', ' + el + '),';
				})

				
				if (formData.tags.length == 0)  {
					q = ''; 
				}
				else {
					q = q.slice(0, -1) + ';';
				}

				console.log('q: ', q)

				client.query(q, function(err, result) {
					done();

					if(err != null) {
						self.throw500(err);
						return;
					}
					else {
						self.json(model,{'Content-Type':'application/json'}, true);
					}
				})
			}

		})
	})
}



function edit_product() {
	var self = this,
			id = self.req.path[1],
			response = {};

	DB('ao', function(err, client, done) {
		client.query('SELECT * FROM products WHERE id=' + id, function(err, result) {

			if (err != null) {
				self.throw500(err);
				return;
			}
			else {
				console.log("edit_prod: ", result.rows[0])
				response.p_data = result.rows[0];
			}

			client.query('SELECT * FROM producers;', function(err, result) {
				done();
				
				if (err != null) {
				self.throw500(err);
				return;
				}
				else {
					console.log("producers: ", result.rows)
					response.c_data = result.rows;
				}

				self.view('edit_product', response)
			})
		})
	})
}

function post_edit_product()  {
	var self = this,
	formData = self.body,
	id = self.req.path[1],
	imgs = self.files || [],
	dir = 'public/u/product_img/'+id;
	
// eval(locus)
console.log('imgs: ', imgs.length, imgs)
	
	fs.mkdir(dir, function(err) {
		imgs.forEach(function(el, i) {
			var newPath = 'public/u/product_img/'+ id + '/' +i +'.png';;
			fs.rename(el.path, newPath, function(err) {
				if (err) return console.error(err)
				console.log('file uploaded!')
			})
		})
	})
	
	DB('ao', function(err, client, done) {
		client.query('UPDATE products SET name=$1, price=$2, description=$3, img_count=$4, external_link=$5, notes=$6 WHERE id=' + id, [formData.name, formData.price, formData.description, imgs.length, formData.external_link, formData.notes], function(err, result) {
			done();

			if (err != null) {
				self.throw500(err);
				return;
			}
			else {
				self.redirect('/products')
			}
		})
	})


}

function delete_product() {
	var self = this,
		id = self.req.path[1];

	DB('ao', function(err, client, done) {
		client.query('DELETE FROM products WHERE id=' + id, function(err, result) {
			done();

			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				self.redirect('/products');
			}
		})
	})
}
