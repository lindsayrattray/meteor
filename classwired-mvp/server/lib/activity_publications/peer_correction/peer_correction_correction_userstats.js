Meteor.publish('PeerCorrection_CorrectionUserStats', function(activityInstanceId) {
	return PeerCorrection_CorrectionUserStats.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
});