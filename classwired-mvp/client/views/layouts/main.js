Meteor.subscribe('rooms');

Deps.autorun(function() {
	var currentRoom = undefined;
	var roomId = Session.get('roomId');

	if(!roomId) {
		currentRoom = Rooms.findOne();
		if(currentRoom) {
			Session.set('roomId', currentRoom._id);
			Session.set('roomState', currentRoom.state);
		}
	}
	else {
		currentRoom = Rooms.findOne(roomId);
		if(currentRoom) {
			Session.set('roomState', currentRoom.state);
		}
	}
});

Deps.autorun(function() {
	var userName = Meteor.user() ? Meteor.user().profile.name : undefined;
	console.log(userName);
	Meteor.subscribe('inputs', userName);
});