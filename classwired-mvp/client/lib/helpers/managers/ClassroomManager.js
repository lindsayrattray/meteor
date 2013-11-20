// ==============================================
// Classroom Manager object, handles the current
// classroom and provides a point of access for
// the group manager and activity manager
// ==============================================

//TODO
//		- Make set set the current classroom on the user
//		- Add overrideable callback for set classroom
//		- Fill out create and delete classrooms


ClassroomManager = function(classroom) {
	var thisClassroom = classroom;

	this.subscriptions = {
		classroomsHandle: Meteor.subscribe('classrooms'),
		pastActivitiesHandle: Meteor.subscribe('pastActivities', thisClassroom),
		activitiesHandle: Meteor.subscribe('activities')
	};

	this.uiState = {
		datasource: {},
		deps: {},

		ensureDeps: function(key) {
			if(!this.deps[key]) {
				this.deps[key] = new Deps.Dependency;
			}
		},

		get: function(key) {
			this.ensureDeps(key);
			this.deps[key].depend();
			return this.datasource[key];
		},

		set: function(key, value) {
			this.ensureDeps(key);
			this.datasource[key] = value;
			this.deps[key].changed();
		},

		clear: function() {
			for(key in this.datasource)
			{
				this.set(this.datasource[key], null);
			}

			this.datasource = {};
			this.deps = {};
		}
	};

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

	this.createClassroom = function(name, userManager, description) {
		var hasPermission = (userManager.hasRole(Roles.TEACHER));
		var hasAdvancedPermission = (userManager.hasRole(Roles.SCHOOL)  ||
							 		 userManager.hasRole(Roles.ADMIN));

		if(userManager.get() && (hasPermission || hasAdvancedPermission))
		{
			if(Classrooms.findOne({ name: name }))
			{
				alert('Classroom with name: \"' + name + '\" already exists!');
			}
			else
			{
				Meteor.call('createClassroom', name, userManager.get(), description);
			}
		}
		else if(userManager.get())
		{
			alert('Insufficient permissions to create classroom!');
		}
		else
		{
			alert('You need to be logged in to create a classroom!');
		}
	};

	this.deleteClassroom = function(classroom, userManager) {
		var hasPermission = (userManager.hasRole(Roles.TEACHER));
		var hasAdvancedPermission = (userManager.hasRole(Roles.SCHOOL)  ||
							 		 userManager.hasRole(Roles.ADMIN));

		if(userManager.get() && (hasPermission || hasAdvancedPermission))
		{
			var target = Classrooms.findOne(classroom);
			if(target.owner === userManager.getValue(['_id']) || hasAdvancedPermission)
			{
				Meteor.call('deleteClassroom', target, userManager.get());
			}
			else
			{
				alert('You do not have permission to delete this classroom');
			}
		}
		else if(userManager.get())
		{
			alert('Insufficient permissions to delete classroom!');
		}
		else
		{
			alert('You need to be logged in to delete a classroom!');
		}
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