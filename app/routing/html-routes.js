// Dependancies
// we need to include the path package to get the correct file path for our html
var path = require('path');



// Routing
module.exports = function(app) {
	
	// HTML GET requests
	// below is the code that handles when a user visits a page so that the appropriate html page is shown to the user
	app.get('/survey', function(req, res) {

		// display the survey.html page if the user visits /survey
		res.sendFile(path.join(__dirname, '..', 'public', 'survey.html'));

	}); // end app.get()

	// default home screen if no matching route is found
	app.use(function(req, res) {

		// display the home.html page if anything other than /survey is visited by the user
		res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));

	}); // and app.use()

} // end module.exports