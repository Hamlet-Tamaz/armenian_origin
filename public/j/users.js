$(document).ready(function() {
	// console.log('edits: ', $('.editBtn') )

	$.each($('.editBtn'), function(i, val) {
		// debugger

		$(val).on('click', i, openModal)
	})
});

function openModal(event) {
	console.log('i: ', event.data)
	// debugger

	var i_id = $('.producerID')[event.data].children[0].innerHTML;
	
	$.get('/userData/' + i_id, function(result) {
		console.log('result from modal: ', result[0])
		
		for (var i in result[0]) {

			if ($('#editUser input[name="' + i + '"')[0] != undefined) {
				$('#editUser input[name="' + i + '"')[0].value = result[0][i]
			}

		}

		console.log('footer: ', $('.modal-footer form')[0] );
		
		$('.modal-body form')[0].attributes.action.value = '/users/' + i_id + '/edit'

		// debugger

		$('#editModal').modal('show');


	})



}