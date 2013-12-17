Meteor.publish('PeerCorrection_CorrectionItems', function(groupId, classroomId, activityInstanceId, userId) {
	if(UserController.userHasRole(userId, Roles.TEACHER))
	{
		return PeerCorrection_CorrectionItems.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
	}
	if(groupId && classroomId && userId)
	{
		return PeerCorrection_CorrectionItems.find({ assigned_to: userId, groupId: groupId, classroomId: classroomId, activityInstanceId: activityInstanceId });
	}
});