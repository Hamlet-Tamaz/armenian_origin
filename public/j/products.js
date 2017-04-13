$(document).ready(function() {
	// var MINI = require('minified'); 

	console.log('here: ', $('#dataList'));

	// $('#dataList')

	// $.get('/productsData', function(result) {
		
	// 	var list = {};

	// 	console.log('result: ', result.rows)

	// 	for (var el in result.rows) {

	// 		var a = '<h4>' + result.rows[el].id + '</h4>';
	// 		var b = '<h4>' + result.rows[el].name + '</h4>';
	// 		var c = '<h4>' + result.rows[el].producer_id + '</h4>';
	// 		var d = '<h4>' + result.rows[el].description + '</h4>';
	// 		var e = '<h4>' + result.rows[el].price + '</h4>';
	
	// 		console.log('el: ',el, result.rows[el])
	// 		console.log('FC: ', $('#right'))
			
	// 		$('#productID').append(a)
	// 		$('#productName').append(b)
	// 		$('#productProducer').append(c)
	// 		$('#productDescription').append(d)
	// 		$('#productPrice').append(e)



	// 	}
	// });


	$('#trial').click(function(e) {

		var $form = $('#postProductForm');
		var $inputs = $('#postProductForm :input');
		var fields = ['name', 'producer', 'price', 'tags', 'description', 'external_link', 'notes' ];
		var vals = {};
		// var vals = fields.filter(function(key) { return $.contains(fields, key); })
		



//	COLLECT VALID INPUT VALUES INTO VALS
		$inputs.each(function(el) {
			// debugger
			if (this.type == 'checkbox') {
				if($(this).is(':checked')) {
					if (!vals[this.name]) {
						vals[this.name] = this.value;
					}
					else {
						vals[this.name] += ' ' + $(this).val();
					}
				}
			}
			else if (!vals[this.name]) {
				if(this.type != 'submit') vals[this.name] = $(this).val();
			}
		})

		if(!vals.name) showError('Please indicate the name of the product.');
		// else if(!vals.producer) showError('Please select the producer of this product.');
		// else if(!vals.price) showError('Please indicate the price of this product.');
		// else if(!vals.tags) showError('Please select the tags of this item.');
		// else if(!vals.description) showError('Please provide a description for your product.');
		else {
			

			$.post('/products', vals, function(result) {	
			
debugger

				if(result.id > 0) {

//	CLEAR OUT INPUT FIELDS
					var $f = $('#postProductForm');
	//	TEXT FIELDS
					[0,2,13,14,15,16].forEach(function(el,i) {

						$f[0][el].value = '';	
					})
	// 	INT FIELD
					$f[0][1].value = 0;
	// TEXTAREA

					// [13].forEach(function(el,i) {
					// 	$f[0][i].innerHTML = '';	
					// })
	// 	SELECT/CHECKBOX FIELDS
					var tags = $('input[type="checkbox"]');
					
					for(var i=0; i<tags.length; i++) {
						if(tags[i].localName == 'input') {
							tags[i].checked = false;
						}
					}
	//  DELETE ERROR MESSAGE
					$('#products h3.errorMsg')[0].innerHTML = ''


//	DYNAMICALLY ADD NEWLY POSTED PRODUCT
					var $c = $('#productList');
					var $newItem = $('#productList').children()[2];

					$c.prepend(
						$("<div/>", {'class':'row'}).append( 
							$("<a/>", {
								'href':'/products/' + result.id, 
								'class':'col-xs-10'
							}).append(
					    		$("<div/>", {'class':'col-xs-3 productID'}).append(
					    			$("<h5/>", {'text':result.id})
				    			),
				    			$("<div/>", {'class':'col-xs-3 productName'}).append(
					    			$("<h5/>", {'text':result.name})
				    			),
				    			$("<div/>", {'class':'col-xs-3 productProducer'}).append(
					    			$("<h5/>", {'text':result.producer_id})
				    			),
				    			$("<div/>", {'class':'col-xs-3 productPrice'}).append(
					    			$("<h5/>", {'text':result.price})
				    			)
		    				),

							$("<div/>", {'class':'col-xs-2'}).append(
								$("<form/>", {"action":"/products/"+result.id+"/edit", "method":"get"}).append(
									$("<button/>", {"class":"btn btn-info col-xs-6", "text":"Edit", "style":"text-align: center"})
								),
								$("<form/>", {"action":"/products/"+result.id+"/delete", "method":"post"}).append(
									$("<button/>", {"class":"btn btn-danger col-xs-5 col-xs-offset-1", "text":"X"})
								)
							)
						)
					)
				}
			}, 'json')
		}
	})
	
});

showError = function(msg) {
	var $e = $('#products h3.errorMsg');

	$e[0].innerHTML = '';
	$e.append(msg);
	// debugger
};

// function addProduct() {
// 	$.post('/products', function(data) {
// 		debugger
// 		var l = data;

// 		$list = $('#productList')

// 		$list.append(l)
// 	})

// 	$.ajax({
// 		type: 'POST',
// 		url: '/products',
// 		data: data
// 	})
// }