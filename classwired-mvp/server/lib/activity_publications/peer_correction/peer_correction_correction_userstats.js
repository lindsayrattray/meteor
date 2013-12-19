Meteor.publish('PeerCorrection_CorrectionUserStats', function(classroomId, activityInstanceId) {
	return PeerCorrection_CorrectionUserStats.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
});