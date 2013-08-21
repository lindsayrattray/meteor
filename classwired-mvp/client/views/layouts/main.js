Meteor.subscribe('rooms');

Deps.autorun(function() {
	var currentRoom = undefined;
	var roomId = Session.get('roomId');

	if(roomId == undefined) {
		currentRoom = Rooms.findOne();
		if(currentRoom != undefined) {
			Session.set('roomId', currentRoom._id);
			Session.set('roomState', currentRoom.state);
		}
	}
	else {
		currentRoom = Rooms.findOne(roomId);
		if(currentRoom != undefined) {
			Session.set('roomState', currentRoom.state);
		}
	}
});

Deps.autorun(function() {
	Meteor.subscribe('inputs');
});