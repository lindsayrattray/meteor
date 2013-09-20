Meteor.publish('explainTheWord_WordlistItems', function(groupId, classroomId, userId) {
	if(UserController.userHasRole(userId, 'teacher'))
	{
		return ExplainTheWord_WordlistItems.find({classroomId: classroomId});
	}
	if(groupId && classroomId)
	{
		return ExplainTheWord_WordlistItems.find({groupId: groupId, classroomId: classroomId});
	}
});