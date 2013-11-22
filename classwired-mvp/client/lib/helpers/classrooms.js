// ==============================================
// Instantiate ClassroomManager as CurrentClassroom
// ==============================================

CurrentClassroom = new ClassroomManager()
CurrentClassroom.uiState.load();

// ==============================================
// Instantiate a GroupManager and an Activity
// Manager
// ==============================================

//CurrentClassroom.currentGroup = new GroupManager();
CurrentClassroom.currentActivity = new ActivityManager(null, CurrentClassroom);
CurrentClassroom.currentActivity.uiState.load();

// ==============================================
// Handlebars helpers
// ==============================================

Handlebars.registerHelper('currentClassroom', function() {
	return CurrentClassroom.get();
});

// ==============================================
//	Activity helpers (thanks to meteor's crappy
//	load order, these need to be defined here)
// ==============================================

Handlebars.registerHelper('activityTitle', function(activity) {
	var thisActivity = Activities.findOne(activity);
	return GetValue(thisActivity, ['title']);
});

Handlebars.registerHelper('activityDescription', function(activity) {
	var thisActivity = Activities.findOne(activity);
	return GetValue(thisActivity, ['description']);
});

Handlebars.registerHelper('activityIconURL', function(activity) {
	var thisActivity = Activities.findOne(activity);
	return GetValue(thisActivity, ['iconURL']);
});