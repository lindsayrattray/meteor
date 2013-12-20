Meteor.publish('PeerCorrection_CorrectionItemStats', function(activityInstanceId) {
	return PeerCorrection_CorrectionItemStats.find({ activityInstanceId: activityInstanceId });
});