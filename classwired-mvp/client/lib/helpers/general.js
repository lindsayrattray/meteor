Handlebars.registerHelper('sessionGet', function(sessionVarName) {
	return Session.get(sessionVarName);
});