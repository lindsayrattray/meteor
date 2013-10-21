Template.activityExplainTheWord_UI_Context.helpers({
	isPaused: function() {
		var classroomId = Session.get('currentClassroom');
		var classroom = Classrooms.findOne(classroomId);

		return classroom.state === 'paused';
	},
	isStopped: function() {
		var classroomId = Session.get('currentClassroom');
		var classroom = Classrooms.findOne(classroomId);

		return classroom.state === 'stopped';
	},
	context: function() {
		return 'Explain the Word';
	}
});