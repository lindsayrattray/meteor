Meteor.publish('PeerCorrection_WordlistItems', function(groupId, classroomId, activityInstanceId, userId) {
	if(UserController.userHasRole(userId, 'teacher'))
	{
		return PeerCorrection_WordlistItems.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
	}
	if(groupId && classroomId)
	{
		return PeerCorrection_WordlistItems.find({ $or: [{ groupId: groupId, classroomId: classroomId, activityInstanceId: activityInstanceId }, { userId: userId, classroomId: classroomId, activityInstanceId: activityInstanceId }] });
	}
});