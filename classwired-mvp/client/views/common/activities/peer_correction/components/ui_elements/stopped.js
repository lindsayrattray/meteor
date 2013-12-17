Template.activityPeerCorrection_Stopped.events({
	'click button.end': function(event, template) {
		CurrentClassroom.currentActivity.set(null, CurrentUser);
	}
});