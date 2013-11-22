CurrentClassroom.currentActivity.setOnCreate(function(error, result) {
	var activityInstance = ActivityInstances.findOne(result);

	CurrentClassroom.currentActivity.set(activityInstance, CurrentUser);
});

Template.activityManager.helpers({
	activities: function() {
		return Activities.find();
	}
});

Template.activityManager.events({
	'click .activity-manager > ul li a': function(event, template) {
		
	}
});