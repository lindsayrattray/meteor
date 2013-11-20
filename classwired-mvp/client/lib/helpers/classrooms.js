// ==============================================
// Instantiate ClassroomManager as CurrentClassroom
// ==============================================

CurrentClassroom = new ClassroomManager()
CurrentClassroom.uiState.load();

// ==============================================
// Handlebars helpers
// ==============================================

Handlebars.registerHelper('currentClassroom', function() {
	return CurrentClassroom.get();
});