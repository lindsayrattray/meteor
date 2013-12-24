Meteor.publish('explainTheWord_ExplainItems', function(groupId, classroomId, activityInstanceId, userId) {
	if(UserController.userHasRole(userId, Roles.TEACHER))
	{
		return ExplainTheWord_ExplainItems.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
	}
	if(groupId && classroomId && userId)
	{
		return ExplainTheWord_ExplainItems.find({ assigned_to: userId, groupId: groupId, classroomId: classroomId, activityInstanceId: activityInstanceId });
	}
});