Meteor.publish('explainTheWord_ExplainItemTimes', function(activityInstanceId) {
	return ExplainTheWord_ExplainItemTimes.find({ activityInstanceId: activityInstanceId });
});