$(document).ready(function() {
	// $('#inp').on('change', (function(e) {
	// 	var files = this.files,
	// 	ar = [],
	// 	obj ={};
		
	// 		$('#TFS').on('click', {files: files}, function(e) {
	// 			e.preventDefault();


	// 			for (var i in files) {
	// 				if (i != 'item') obj.push(files[i].name);
	// 			}
				
	// 			debugger
	// 			$.post('/test/post', obj,  function(result) {
	// 				console.log('result')
	// 			})
	// 		})
	// 	})

	// )
	
	$('#testForm2').submit(function(e) {
		e.preventDefault();

		$.post('/test', function(result) {
			debugger
		})
	})

});