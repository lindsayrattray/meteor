Meteor.publish('inputs', function(username) {
	if (username == undefined) {
		return Inputs.find();	
	}
	else {
		return Inputs.find({author: username});
	}
});