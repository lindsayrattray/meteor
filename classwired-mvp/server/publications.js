Meteor.publish('inputs', function() {
	return Posts.find();
});

Meteor.publish('userInputs', function(user) {
	return Posts.find({author: user});
});