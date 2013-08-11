Meteor.subscribe('rooms');

Deps.autorun(function() {
	if(Session.get('room-id') == undefined) {
		var currentRoom = Rooms.findOne();
		if(currentRoom != undefined) {
			Session.set('room-id', currentRoom._id);
		}
	}
});

Deps.autorun(function() {
	Meteor.subscribe('inputs', Session.get('username'));
});