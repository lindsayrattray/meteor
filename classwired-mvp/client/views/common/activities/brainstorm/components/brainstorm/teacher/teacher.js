Template.activityBrainstorm_Brainstorm_Teacher.helpers({
	brainstormItems: function() {
		return Brainstorm_Items.find({}, { sort: { created_timestamp: 1 } });
	}
});