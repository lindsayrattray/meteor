Template.activityPeerCorrection_UI_Teacher_RightButton.events({
	'click button.right': function() {
		CurrentClassroom.currentActivity.uiState.set('statsMode', 'activity');
	}
});