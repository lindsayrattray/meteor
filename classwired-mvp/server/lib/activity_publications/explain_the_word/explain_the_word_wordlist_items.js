Meteor.publish('explainTheWord_WordlistItems', function(groupId, classroomId, activityInstanceId, userId) {
	if(UserController.userHasRole(userId, 'teacher'))
	{
		return ExplainTheWord_WordlistItems.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
	}
	if(groupId && classroomId)
	{
		return ExplainTheWord_WordlistItems.find({ $or: [{ groupId: groupId, classroomId: classroomId, activityInstanceId: activityInstanceId }, { userId: userId, classroomId: classroomId, activityInstanceId: activityInstanceId }] });
	}
});