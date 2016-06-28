// Javascript function that wraps everything
$(document).ready(function(){

	// Functions

	// function that displays the value of each range slider on the page and is passed this from the mousemove event trigger
	function rangeSlider(event) {

		// store the id of the input being used
		var the_id = ($(event).attr('id'));

		// split the id on the - and return the second index of the string array
		var output_id = the_id.split('-')[1];

		// display the value of the rangeslider to the output element
		$('#op-' + output_id).text($('#' + the_id).val());

	} // end rangeSlider()


	// Events

    $('.rangeslider').mousemove(function(e) {

    	// store this in the event parameter
    	e = this;

    	// call the rangeslider function and pass this to it
    	rangeSlider(e);

    }); // end mousevove()

}); // end jquery()