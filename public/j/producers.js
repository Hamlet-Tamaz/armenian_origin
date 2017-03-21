$(document).ready(function() {
	console.log('here: ', $('#dataList'));


    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }

        // debugger
    });
});


function imageIsLoaded(e) {
    $('#bioImg').attr('src', e.target.result);
    debugger
};