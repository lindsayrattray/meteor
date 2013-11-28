CurrentClassroom.currentActivity.setOnCreate(function(error, result) {
	var activityInstance = ActivityInstances.findOne(result);

	CurrentClassroom.currentActivity.set(activityInstance, CurrentUser);
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
	},
	pastActivities: function() {
		var thisActivityId = CurrentClassroom.currentActivity.uiState.get('selectedActivity');
		var thisActivity = Activities.findOne(thisActivityId);

		if(thisActivity)
		{
			return ActivityInstances.find({ activityId: thisActivity._id }, { sort: { attempt_timestamp: 1 } });
		}
	},
	selection: function() {
		var thisActivityId = CurrentClassroom.currentActivity.uiState.get('selectedActivity');
		return Activities.findOne(thisActivityId);
	},
	formattedTimestamp: function(timestamp) {
		var date = new Date(timestamp);
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' at ' + date.getHours() + ':' + date.getMinutes();
	}
});

Template.activityManager.events({
	'click .activity-manager .activities > li > a': function(event, template) {
		CurrentClassroom.currentActivity.uiState.set('selectedActivity', this._id);
	},
	'click .activity-manager .past-activities > li > a': function(event, template) {
		CurrentClassroom.currentActivity.set(this, CurrentUser)
	},
	'click .activity-manager .back': function(event, template) {
		CurrentClassroom.currentActivity.uiState.set('selectedActivity', null);
	},
	'click .activity-manager .new': function(event, template) {
		CurrentClassroom.currentActivity.create(CurrentClassroom.currentActivity.uiState.get('selectedActivity'), CurrentUser);
	},
});