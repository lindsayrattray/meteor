Meteor.publish('inputs', function() {
	return Inputs.find();
});

Meteor.publish('userInputs', function(user) {
	return Inputs.find({author: user});
});