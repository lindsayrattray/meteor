Template.activity.helpers({
	inputs: function() {
		return Inputs.find();
	},

	room: function() {
		return Rooms.findOne(Session.get('room-id'));
	},

	roomIsInListState: function() {
		return Session.get('room-state') == "list";
	}
});