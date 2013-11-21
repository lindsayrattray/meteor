Meteor.publish('explainTheWord_ExplainItems', function(groupId, classroomId, activityInstanceId, userId) {
	if(UserController.userHasRole(userId, 'teacher'))
	{
		return ExplainTheWord_ExplainItems.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
	}
	if(groupId && classroomId)
	{
		return ExplainTheWord_ExplainItems.find({ groupId: groupId, classroomId: classroomId, activityInstanceId: activityInstanceId });
	}
});