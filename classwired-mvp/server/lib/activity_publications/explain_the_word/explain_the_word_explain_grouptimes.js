Meteor.publish('ExplainTheWord_ExplainGroupTimes', function(activityInstanceId) {
	return ExplainTheWord_ExplainGroupTimes.find({ activityInstanceId: activityInstanceId });
});