Template.activityBrainstorm_UI_Context.helpers({
	isPaused: function() {
		return CurrentClassroom.currentActivity.getValue(['state']) === 'paused';
	},
	isStopped: function() {
		return CurrentClassroom.currentActivity.getValue(['state']) === 'stopped';
	},
	context: function() {
		return 'Brainstorm';
	}
});