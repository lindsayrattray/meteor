Template.groupManager.events({
	'click .btn-join-group': function(event, template) {
		var user = Meteor.user();
		var classroom = template.data._id;
		var targetId = this._id;
		var currentGroup = Groups.findOne({ classroomId: classroom, members: user._id });

		if(targetId !== currentGroup._id)
		{
			GroupManager.moveUserToGroup(currentGroup._id, targetId, user._id);
		}
	},
	'click .btn-remove-user-from-group': function(event, template) {
		var user = Meteor.users.findOne(event.srcElement.dataset.member);
		var classroom = template.data._id;
		var group = Groups.findOne({ classroomId: classroom, members: user._id });
		GroupManager.removeUserFromGroup(group._id, user._id);
	}
});

Template.groupManager.helpers({
	groups: function() {
		return Groups.find();	
	}
});