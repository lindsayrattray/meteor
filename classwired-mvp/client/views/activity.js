Template.activity.events({
	'click #list-state-btn': function() {
		Rooms.update(Session.get('room-id'), { $set: { state: "list" } })
	},
	'click #share-state-btn': function() {
		Rooms.update(Session.get('room-id'), { $set: { state: "share" } })
	}
});

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