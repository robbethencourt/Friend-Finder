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

		// check if the name and photo elements are empty strings
		if (the_name === '' || the_image_url === '') {

			// store the modal-body div into a variable
			var modal_body = $('.modal-body');

			// empty out the div in case the page hasn't reloaded
			$(modal_body).empty();

			// set the text (name of the best match) to the created h2 element and store in a variable
			var error_message = $('<h3>').addClass('error').text('Woops! Looks like you forgot to enter your name or image url.');

			// append both the h2 and image elements with name and photo
			$(modal_body).append(error_message);

			// calling return so that the function stops and not result is returned
			return

		} // end if

		// store each output element in a variable as an array
		var output = $('output');

		// create the scores array and set to empty
		var the_scores = [];

		// loop through the output elements
		var i;
		var output_length = output.length;
		for (i = 0; i < output_length; i++) {

			// push each text, which is the value the user assigned, to the scores array
			the_scores.push($(output[i]).text());

		} // end for loop

		// create a new instance of Friend for the new user and pass the name, image url and scores to the new user object
		var user = new Friend(the_name, the_image_url, the_scores);

		getData(user);

	} // end surveyResults()

	// passing the user data
	function getData(user) {

		// store the api url in a variable
		var api = window.location.origin + '/api/friends';

		// create the request object to pass to the ajax call
		var request = {
			url: api,
			method: 'GET'
		}

		// ajax request with request object passed
		$.ajax(request)

			.done(function(response) {

				// function to get the scores of each of the users stored in the app
				function getScores() {

					// variable to store the scores set to an empty array
					var stored_scores = [];
					
					// loop through the ajax response
					var i;
					var response_length = response.length;
					for (i = 0; i < response_length; i++) {

						// push each of the scores arrays from the ajax response into the stored scores array
						stored_scores.push(response[i].scores);

					} // end for loop

					// call the compareScores function and pass in all the stored scores we got from teh ajax call
					compareScores(stored_scores);

				} // end getScores()

				// compare the scores to the user's score. We're passing in the app's stored scores we got from the getScores function
				function compareScores(stored_scores) {

					// create an empty array so that we can pass each of the score differentials to it
					var total_dif_array = [];
					
					// loop thorugh the stored scores
					var i;
					var stored_scores_length = stored_scores.length;
					for (i = 0; i < stored_scores_length; i++) {

						// declare a variable to get the total difference of the user's score to each of the stored scores in our app
						var total_dif = 0;

						// loop through the array of scores for each user stored in our app
						var j;
						for (j = 0; j < stored_scores[i].length; j++) {

							// ge the difference in scores. We need to convert the user's scores into an integer as that's being passed as a string
							var score_dif = stored_scores[i][j] - parseInt(user.scores[j]);

							// get a positive integer from the scores by checking if the score difference is less than zero, and if it is, then negate it to get a positive. If the score differenece is greater than zero return the score diferrence without any changes 
							var positive_score_dif = -score_dif > 0 ? -score_dif : score_dif;

							// add the positive score difference to the total_dif variable we declared outside this for loop
							total_dif += positive_score_dif;

						} // end for loop

						// push each score differential into the total_dif_array
						total_dif_array.push(total_dif);

					} // end for loop

					// call the matchUser function and pass the array of score differentials
					getIndex(total_dif_array);

				} // end compareScores()

				function getIndex(score_differentials) {
					
					// set a variable to hold the index we will pass to the matchUser function
					var index_of_match = 0;

					// set the lowest score to the first item in the score_differentials array. We will update this variable with the acutal lowest score in the for loop below
					var lowest_value = score_differentials[0];

					// loop through the score differentials
					var i;
					var score_differentials_length = score_differentials.length;
					for (i = 0; i < score_differentials_length; i++) {
						
						// check each array item and compare the the lowest value, which we set to the first item in the array outside of the for loop
						if (score_differentials[i] < lowest_value) {

							// reset the lowest_value to the lowest value checked in the for loop
							lowest_value = score_differentials[i];

							// set the index match to be the inde of the lowest value
							index_of_match = i;

						} // end if

					} // end for loop

					// call matchUser and pass the index number so we can match that with the user in the response callback from .done
					matchUser(index_of_match);

				} // end getIndex()

				function matchUser(index_of_match) {

					// grab the name and image link of the best match by using the index number stored in index_of_match
					var name_of_match = response[index_of_match].name;
					var phot_link = response[index_of_match].photo;

					// store the modal-body div into a variable
					var modal_body = $('.modal-body');

					// empty out the div in case the page hasn't reloaded
					$(modal_body).empty();

					// set the text (name of the best match) to the created h2 element and store in a variable
					var name_heading = $('<h2>').text(name_of_match);

					// create the image element and set the url of the best match and create an alt tag with the corresponding name
					var img_elm = $('<img src="' + phot_link + '" alt="Photo of ' + name_of_match + '">');

					// append both the h2 and image elements with name and photo
					$(modal_body).append(name_heading);
					$(modal_body).append(img_elm);

				} // end matchUser()

				// call the getScores funciton to start the getting of scores and comparison of them
				getScores();

			}); // end ajax
	
	} // end getData()

	// validate the name and photo inputs
	function validateForm(el_passed) {

		// if the element passed, either the name or photo input, is an empty string
		if ($(el_passed).val() === '') {
			
			// add the error class to that input field
			$(el_passed).addClass('error');

		} else {

			// remove the error class from that input field
			$(el_passed).removeClass('error');

		} // end if else

	} // end validateForm()


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

    	// pass the name and photo elements to check for validation when the form is submitted
    	validateForm($('#name'));
    	validateForm($('#photo'));

		// call the surveyResults function
		surveyResults();

    }); // end submit-survey on click()

    // when focus leaves the name input
    $('#name').blur(function(e) {
    	
    	// grab the this keyword
    	e = this;

    	// call the validateForm function and pass it this
    	validateForm(e);

    }); // end name blur()

    // when focus leaves the photo input
    $('#photo').blur(function(e) {
    	
    	// grab the this keyword
    	e = this;

    	// call the validateForm function and pass it this
    	validateForm(e);

    }); // end photo blur()

    // scroll script for nav links
	$("nav a[href^='#']").on('click', function(e) {

	   // prevent default anchor click behavior
	   e.preventDefault();

	   // store hash
	   var hash = this.hash;

	   // animate
	   $('html, body').animate({

	       scrollTop: $(hash).offset().top

	     }, 300, function(){

	       // when done, add hash to url
	       // (default click behaviour)
	       window.location.hash = hash;

	     }); // end animate

	}); // end scroll script

    // when the window resizes call the videoDistortion function to update the height
    $(window).resize(function() {
    	
    	videoDistortion();

    }); // end window.resize()

    function videoDistortion() {
    	
    	// grab the current height of the video
    	var video_height = $('video').height();

    	// if the video is smaller than 650px
    	if (video_height < 650) {

    		// adjust the css of each of the 3 elememts
    		$('.video-distortion').css('height', video_height);
    		$('.jumbotron-content').css('margin-top', (video_height - 70) * -1);
    		$('.video-container').css('height', video_height);

    	} // end if

    } // end videoDistortion()

    videoDistortion();

}); // end jquery()