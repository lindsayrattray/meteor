Template.activity.helpers({
	inputs: function() {
		return Inputs.find();
	},

	roomIsInListState: function() {
		return Session.get('roomState') == "list";
	}
});