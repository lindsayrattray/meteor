Meteor.publish('brainstorm_Items', function(userId, classroomId) {
	if(UserController.userHasRole(userId, 'teacher'))
	{
		return Brainstorm_Items.find({ classroomId: classroomId });
	}
	if(userId && classroomId)
	{
		return Brainstorm_Items.find({ userId: userId, classroomId: classroomId });
	}
});