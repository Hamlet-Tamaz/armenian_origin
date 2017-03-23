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
	F.route('/producers/{id}/edit', post_edit_producer, ['post']);
	F.route('/producersData', get_producers, ['get']);
	F.route('/producers', post_producers, ['post', 'upload'], 5000);
	F.route('/producers/{id}/delete', delete_producer, ['post']);
	
	F.route('/products', view_products, ['get']);
	F.route('/products/query/{category}', get_products, ['get']);
	F.route('/products', post_products, ['post', 'upload'], 5000);
	F.route('/products/{id}', view_product, ['get']);
	F.route('/products/{id}/edit', edit_product, ['get']);
	F.route('/products/{id}/edit', post_edit_product, ['post']);
	F.route('/products/{id}/delete', delete_product, ['post']);
	
	F.route('/test', test)


};

function test() {
self = this;

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
		client.query('SELECT * FROM producers', function(err, result) {
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

		// console.log('x: ', x)
	})
	
}

function post_producers() {
	var self = this,
		formData = self.body,
		img = self.files[0] || '';

	console.log('formData: ', formData)
	console.log('img: ', img)

	

	DB('ao', function(err,client, done) {

		fs.rename(img.path, 'public/u/producer_img/temp', function(err) {
			if (err) return console.error(err)
			console.log('file uploaded!')
		})

		client.query('INSERT INTO producers (name, bio) VALUES ($1, $2) RETURNING id;', [formData.name, formData.bio], function(err,result) {
				done();
			

			var id = result.rows[0].id

			fs.rename('public/u/producer_img/temp', 'public/u/producer_img/'+id+'.png', function(err) {
				if (err) return console.error(err)

				console.log('file uploaded!')
			})

		// eval(locus)
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
		client.query('SELECT p.id AS id, p.name AS name, p.producer_id, p.description, p.price, p.img_url AS item_pic, c.id AS c_id, c.name AS c_name, c.img AS c_img, c.bio FROM products p FULL OUTER JOIN producers c ON p.producer_id = c.id WHERE c.id =' + pid +'ORDER BY p.id', function(err, result) {
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
	 formData = self.body;

	DB('ao', function(err, client, done) {
		client.query('UPDATE producers SET name=$1, img_url=$2, bio=$3 WHERE id=' + id, [formData.name, formData.img_url, formData.bio],function(err, result) {
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

		client.query("SELECT * FROM products ORDER BY id", function(err, result) {

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

				client.query("SELECT * FROM producers WHERE id=" + pid, function(err, result) {
					// done();

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

								console.log('producer search: ', result.rows)
								console.log('response: ', response)
								self.view('product', response)								
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
		client.query("SELECT * FROM products WHERE categories LIKE '%" + tag + "%'", function(err, result) {
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
	var self = this;
	var formData = self.body,
	imgs = self.files || '',
	categories = '';

	if(typeof(formData.categories) == 'string') {
		formData.categories = [formData.categories];
	}

	// console.log('formData: ', formData, 'categories: ', formData['categories'], typeof(formData.categories))
	
//	SAVE IMAGES FROM TEMP TO PUBLIC

	imgs.forEach(function(el, i) {
		fs.rename(imgs[i].path, 'public/u/product_img/'+ formData.producer + '-' + i +'.png', function(err) {
			if (err) return console.error(err)
			console.log('file uploaded!')
		})		
	})

//	INSERT PRODUCT
	DB('ao', function(err,client, done) {
		client.query('INSERT INTO products (name, producer_id, description, price, external_link, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [formData.name, formData.producer, formData.description, +formData.price, formData.external_link, formData.notes], function(err,result) {

			if(err != null) {
				self.throw500(err);
				return;
			}
			else {
				var id = result.rows[0].id,
					q = 'INSERT INTO product_tag (product_id, tag_id) VALUES',
					v = [],
					count = 1,
					tag;

				formData.categories.forEach(function(el, i) {
					// categories = categories + ' ' + el;
					q = q + ' ($' + (count++) + ', $' + (count++) + '),';
					
					v.push(id);
					v.push(el);
				})

				q = q.slice(0, -1) + ';';

				console.log('q: ', q, 'v: ', v)




//	INSERTING TAGS
				client.query(q, v, function(err, result) {
					done();

					if(err != null) {
						self.throw500(err);
						return;
					}
					else {
						console.log('posting user: ', result.rows[0])
						self.redirect('/products');
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
	id = self.req.path[1];
	
	DB('ao', function(err, client, done) {
		client.query('UPDATE products SET name=$1, price=$2, description=$3, img_url=$4, external_link=$5, notes=$6 WHERE id=' + id, [formData.name, formData.price, formData.description, formData.img_url, formData.external_link, formData.notes], function(err, result) {
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
