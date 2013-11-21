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