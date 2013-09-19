Meteor.methods({
	createGroup: function(classroomId, userId) {
		Groups.insert({ classroomId: classroomId, members: [userId] });
	},
	mergeGroups: function() {

	}
});