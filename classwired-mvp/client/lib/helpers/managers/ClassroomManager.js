// ==============================================
// Classroom Manager object, handles the current
// classroom and provides a point of access for
// the group manager and activity manager
// ==============================================

//TODO
//		- Make set set the current classroom on the user
//		- Add past activities collection
//		- Add overrideable callback for set classroom
//		- Add UI State defaults


ClassroomManager = function(classroom) {
	var thisClassroom = classroom;

	this.subscriptions = {
		classroomsHandle: Meteor.subscribe('classrooms'),
		pastActivitiesHandle: Meteor.subscribe('pastActivities', thisClassroom),
		activitiesHandle: Meteor.subscribe('activities')
	};

	this.uiState = {};

	// Gets the current classroom object
	this.get = function() {
		return Meteor.findOne(thisClassroom);
	};

	// Sets the current classroom object
	this.set = function(classroom) {
		thisClassroom = classroom;
		this.subscriptions.pastActivitiesHandle = Meteor.subscribe('pastActivities', thisClassroom);
	};

	// Gets a value from the current classroom object
	this.getValue = function(keys) {
		return GetValue(this.get(), keys);
	};

	// Handle for a GroupManager object
	this.currentGroup = null;

	// Handle for an ActivityManager object
	this.currentActivity = null;

	// Get all activities that have been associated
	// with the current classroom
	this.pastActivities = function() {
		return;
	};
};