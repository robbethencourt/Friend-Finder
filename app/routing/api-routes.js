// Load Data
// linking our routes to a series of data sources.
var friend_data = require('../data/friend.js');



// Routing
module.exports = function(app) {
	
	// API get requests
	// link to the data stored in our app so that users can see the JSON data when they visit the below link
	app.get('/api/friends', function(req, res) {
		res.json(friend_data);
	});

	// API post requests
	// below handles the user submitted form. In this app's case, the friend data to match that user to others that are in the data js files.
	app.post('api/friends', function(req, res) {
		// body...
	});

}