Meteor.publish('PeerCorrection_CorrectionUserStats', function(activityInstanceId) {
	return PeerCorrection_CorrectionUserStats.find({ activityInstanceId: activityInstanceId });
});