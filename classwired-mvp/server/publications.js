//TODO add handles for publications

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

Meteor.publish('systemUsers', function() {
	if(this.userId)
	{
		return Meteor.users.find({username: {$ne: 'administrator'}}, {sort: {userId: 1}, fields: {username: 1, profile: 1, emails: 1, permissions: 1}});
	}
});