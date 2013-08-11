Meteor.subscribe('rooms');

Deps.autorun(function() {
	var currentRoom = undefined;
	var roomId = Session.get('room-id');

	if(roomId == undefined) {
		currentRoom = Rooms.findOne();
		if(currentRoom != undefined) {
			Session.set('room-id', currentRoom._id);
			Session.set('room-state', currentRoom.state);
		}
	}
	else {
		currentRoom = Rooms.findOne(roomId);
		if(currentRoom != undefined) {
			Session.set('room-state', currentRoom.state);
		}
	}
});

Deps.autorun(function() {
	Meteor.subscribe('inputs', Session.get('username'));
});