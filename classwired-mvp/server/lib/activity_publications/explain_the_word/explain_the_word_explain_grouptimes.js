Meteor.publish('explainTheWord_ExplainItemTimes', function(classroomId, activityInstanceId) {
	return ExplainTheWord_ExplainGroupTimes.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
});