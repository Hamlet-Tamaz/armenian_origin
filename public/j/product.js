$(document).ready(function() {

	var count = 0;
	console.log('here: ', count, 'this: ', this)
	count++;


});

function changePic(link) {
	var $mainImg = $('.bioImg')
	$mainImg[0].src = link;
}