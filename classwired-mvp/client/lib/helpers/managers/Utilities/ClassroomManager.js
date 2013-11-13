// ==============================================
// Classroom Manager object, handles the current
// classroom and provides a point of access for
// the group manager and activity manager
// ==============================================

//TODO

ClassroomManager = function(classroom) {
	var thisClassroom = classroom;

	this.get = function() {
		return Meteor.findOne(thisClassroom);
	};

	this.set = function(classroom) {
		thisClassroom = classroom;
	};

	this.getValue = function(keys) {
		return GetValue(this.get(), keys);
	};

	this.currentGroup = function() {
		return;
	};

	this.currentActivity = function() {
		return;
	};

	this.pastActivities = function() {
		return;
	};
}