Meteor.publish('explainTheWord_ExplainItemTimes', function(classroomId) {
	return ExplainTheWord_ExplainItemTimes.find({ classroomId: classroomId });
});