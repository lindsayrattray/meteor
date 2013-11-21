Meteor.publish('explainTheWord_ExplainItemTimes', function(classroomId, activityInstanceId) {
	return ExplainTheWord_ExplainItemTimes.find({ classroomId: classroomId, activityInstanceId: activityInstanceId });
});