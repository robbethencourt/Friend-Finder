// Load Data
// linking our routes to a series of data sources.
var friends_data = require('../data/friends.js');



// Routing
module.exports = function(app) {
	
	// API GET requests
	// link to the data stored in our app so that users can see the JSON data when they visit the below link
	app.get('/api/friends', function(req, res) {
		res.json(friends_data);
	});

	// API POST requests
	// below handles the user submitted form. In this app's case, the friend data to match that user to others that are in the data js files.
	app.post('api/friends', function(req, res) {
		// body...
	});

}