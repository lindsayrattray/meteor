Meteor.publish('inputs', function(username) {
	if (!username) {
		return Inputs.find();	
	}
	else {
		return Inputs.find({author: username});
	}
});

Meteor.publish('rooms', function() {
	return Rooms.find();
});

Meteor.publish('inputItems', function() {
	return InputItems.find();
});