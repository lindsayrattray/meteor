Meteor.publish('brainstorm_Items', function(userId, classroomId, activityInstanceId) {
	if(UserController.userHasRole(userId, 'teacher'))
	{
		return Brainstorm_Items.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
	}
	if(userId && classroomId && activityInstanceId)
	{
		return Brainstorm_Items.find({ userId: userId, classroomId: classroomId, activityInstanceId: activityInstanceId });
	}
});