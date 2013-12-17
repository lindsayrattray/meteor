Meteor.publish('PeerCorrection_CorrectionStats', function(classroomId, activityInstanceId) {
	return PeerCorrection_CorrectionStats.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
});