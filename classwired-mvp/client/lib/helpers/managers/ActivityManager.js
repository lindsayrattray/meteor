// ==============================================
// Activity Manager object, handles the current
// activity
// ==============================================

//TODO

ActivityManager = function(activity) {
	var thisActivity = activity;

	this.subscriptions = {
		componentsHandle: Meteor.subscribe('components');
	};

	this.uiState = {};

	this.get = function() {
		return Meteor.findOne(thisClassroom);
	};

	this.set = function(activity) {
		thisActivity = activity;
	};

	this.getValue = function(keys) {
		return GetValue(this.get(), keys);
	};
}