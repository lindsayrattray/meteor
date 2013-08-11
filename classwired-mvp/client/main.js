Meteor.subscribe('rooms');

Deps.autorun(function() {
	if(Session.get('room-id') == undefined) {
		var currentRoom = Rooms.findOne();
		if(currentRoom != undefined) {
			Session.set('room-id', currentRoom._id);
			Session.set('room-state', currentRoom.state);
		}
	}
});

Deps.autorun(function() {
	Meteor.subscribe('inputs', Session.get('username'));
});