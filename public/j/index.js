$(document).ready(function() {
});





function query(tag) {
	
debugger
	// var $item = $('.shopItem')[0];
	// var $it = $item;
	var tag = tag.toLowerCase();

	console.log('tag: ', tag);

	$.get('/products/query/' + tag, function(result) {
		
		var $l = $('#homeShop .products')[0];
		console.log('result: ', result)
		
		$l.innerHTML = '';

		result.forEach(function (el, i) {
			
			$l.append(displayItem(el));
			

			// displayItem(el);

			// $it.children[0].src = el.img_url || '/i/painting_example.jpg';

			// $it.children[1].children[0].innerHTML = el.id
			// $it.children[1].children[1].value = el.id
			// $it.children[1].children[1].innerHTML = 'new text: ' + el.description
			
			// $it.children[2].children[0].innerHTML = '$' + el.price
			

			console.log('el: ', el)

		})
				
	})

}

function displayItem(obj) {
	//make actual display item
}
	


// <img src="/i/img_temp_bird.png" alt="">
// <div class="row">
// 	<h3 class='col-xs-1'>@{p.id}</h3>
// 	<input type="hidden" value='@{p.id}'>
// 	<p class='col-xs-10'>@{p.description}:  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae harum sunt blanditiis veritatis, quaerat laborum voluptate labore ducimus, accusamus iste a laboriosam modi! Laudantium animi deleniti pariatur adipisci fuga ab.</p>
	
// </div>



// <div class="row productsPrice" >
// 	<h3>$@{p.price}</h3>
// </div>











	// DB('ao', function(err, client, done) {
	// 	client.query('SELECT * FROM products WHERE categories LIKE "' + cat + '"', function(err, result) {
	// 		done();

	// 		if (err != null) {
	// 			self.throw500(err);
	// 			return;
	// 		}
	// 		else {
	// 			debugger
	// 			self.json(result.rows)
	// 		}
	// 	})
	// })