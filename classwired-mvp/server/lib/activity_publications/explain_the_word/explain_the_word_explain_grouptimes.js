Meteor.publish('explainTheWord_ExplainGroupTimes', function(classroomId, activityInstanceId) {
	return ExplainTheWord_ExplainGroupTimes.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
});