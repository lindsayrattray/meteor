// ==============================================
// Instantiate ClassroomManager as CurrentClassroom
// ==============================================

CurrentClassroom = new ClassroomManager()

// ==============================================
// Handlebars helpers
// ==============================================

Handlebars.registerHelper('currentClassroom', function() {
	return CurrentClassroom.get();
});