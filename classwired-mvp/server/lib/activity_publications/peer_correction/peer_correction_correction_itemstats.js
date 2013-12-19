Meteor.publish('PeerCorrection_CorrectionItemStats', function(classroomId, activityInstanceId) {
	return PeerCorrection_CorrectionItemStats.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
});