CurrentClassroom.currentActivity.setOnCreate(function(error, result) {
	var activityInstance = ActivityInstances.findOne(result);

	//CurrentClassroom.currentActivity.set(activityInstance, CurrentUser);
});

var toggleView = function(selectedActivity)
{
	if(selectedActivity)
	{
		$('.activity-manager > .container').addClass('show-info');
	}
	else
	{
		$('.activity-manager > .container').removeClass('show-info');
	}
}

Deps.autorun(function() {
	var selectedActivity = CurrentClassroom.currentActivity.uiState.get('selectedActivity');

	toggleView(selectedActivity);
});

Template.activityManager.rendered = function() {
	var selectedActivity = CurrentClassroom.currentActivity.uiState.get('selectedActivity');

	toggleView(selectedActivity);
};

Template.activityManager.helpers({
	activities: function() {
		return Activities.find();
	}
});

Template.activityManager.events({
	'click .activity-manager ul li a': function(event, template) {
		CurrentClassroom.currentActivity.uiState.set('selectedActivity', this._id);

		//CurrentClassroom.currentActivity.create(this, CurrentUser);
		//
		//Meteor.call('setCurrentActivity', template.data.classroom._id, this._id);
	}
});