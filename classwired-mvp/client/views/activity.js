Template.activity.events({
	'click #list-state-btn': function() {
		Rooms.update(Session.get('roomId'), { $set: { state: "list" } })
	},
	'click #share-state-btn': function() {
		Rooms.update(Session.get('roomId'), { $set: { state: "share" } })
	}
});

Template.activity.helpers({
	inputs: function() {
		return Inputs.find();
	},

	room: function() {
		return Rooms.findOne(Session.get('roomId'));
	},

	roomIsInListState: function() {
		return Session.get('roomState') == "list";
	}
});