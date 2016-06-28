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

	function surveyResults() {
		
		// declare a Friend constructor function and pass in the values.
		function Friend(name, image_url, scores) {

			this.name = name,
			this.image_url = image_url,
			this.scores = scores

		} // end Friend()

		// store the users name in a variable
		var the_name = $('#name').val().trim();

		// store the image url in a variable
		var the_image_url = $('#photo').val().trim();

		// store each output element in an variable as an array
		var output = $('output');

		// create the scores array and set to empty
		var the_scores = [];

		// loop through the output elements
		var i;
		var output_length = output.length;
		for (var i = 0; i < output_length; i++) {

			// push each text, which is the value the user assigned, to the scores array
			the_scores.push($(output[i]).text());

		} // end for loop

		// create a new instance of Friend for the new user and pass the name, image url and scores to the new user object
		var user = new Friend(the_name, the_image_url, the_scores);

		console.log(user);

	} // end surveyResults()


	// Events

    $('.rangeslider').mousemove(function(e) {

    	// store this in the event parameter
    	e = this;

    	// call the rangeslider function and pass this to it
    	rangeSlider(e);

    }); // end mousevove()

    $('#submit-survey').on('click', function(e) {

    	// stop the page from reloading
    	e.preventDefault();
    	
    	// call the surveyResults function
    	surveyResults();

    }); // end submit-survey on click()

}); // end jquery()