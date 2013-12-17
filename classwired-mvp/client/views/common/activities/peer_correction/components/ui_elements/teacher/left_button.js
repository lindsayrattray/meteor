Template.activityPeerCorrection_UI_Teacher_LeftButton.events({
	'click button.left': function() {
		CurrentClassroom.currentActivity.uiState.set('statsMode', 'class');
	}
});