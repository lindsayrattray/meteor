Meteor.publish('explainTheWord_ExplainItems', function(groupId, classroomId, userId) {
	if(UserController.userHasRole(userId, 'teacher'))
	{
		return ExplainTheWord_ExplainItems.find({classroomId: classroomId});
	}
	if(groupId && classroomId)
	{
		return ExplainTheWord_ExplainItems.find({ groupId: groupId, classroomId: classroomId });
	}
});