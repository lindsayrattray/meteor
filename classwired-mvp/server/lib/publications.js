//TODO add handles for publications

Meteor.publish('groups', function(userId, classroomId) {
	var query = {}
	if(classroomId)
	{
		query.classroomId = classroomId;
	}
	if(userId)
	{
		query.members = userId;
	}
	if(query.classroomId || query.members)
	{
		return Groups.find(query);
	}
});

Meteor.publish('classroomGroups', function(classroomId) {
	if(classroomId)
	{
		return Groups.find({classroomId: classroomId});
	}
})

Meteor.publish('classrooms', function() {
	return Classrooms.find();
});

Meteor.publish('systemUsers', function() {
	return Meteor.users.find({}, { sort: { userId: 1 }, fields: { username: 1, profile: 1, emails: 1, permissions: 1 } });
});

Meteor.publish('activities', function() {
	return Activities.find();
});

Meteor.publish('components', function(activityId) {
	return Components.find({ activityId: activityId });
});