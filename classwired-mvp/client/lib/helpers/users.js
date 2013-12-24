// ==============================================
// Instantiate UserManager as CurrentUser
// ==============================================

CurrentUser = new UserManager();
CurrentUser.uiState.load();

// ==============================================
// Handlebars helpers
// ==============================================

// Utility Functions

// Compare a given user to the currently logged in user
function isCurrentUser(user)
{
	return Meteor.user() === Meteor.users.findOne(user);
}

// Helpers

// Get the currently logged in user's ID
Handlebars.registerHelper('currentUserId', function() {
	return Meteor.userId().toString();
});

// Check whether a user matches the currently logged in user
Handlebars.registerHelper('isCurrentUser', function(user) {
	return isCurrentUser(user)
});

// Check whether a userId matches the currently logged in user
// or the currently logged in user has a specified role
Handlebars.registerHelper('isCurrentUserOrRole', function(user, role) {
	return isCurrentUser(user) || CurrentUser.hasRole(role);
});

// Get the profile name of a given user
Handlebars.registerHelper('profileName', function(user) {
	var target = Meteor.users.findOne(user);
	return GetValue(target, ['profile', 'name']);
});

// Get the email address of a given user
Handlebars.registerHelper('emailAddress', function(user) {
	var target = Meteor.users.findOne(user);
	return GetValue(target, ['emails', [0], 'address']);
});

// Check whether a given user has a specified role
Handlebars.registerHelper('userHasRole', function(user, role) {
	var target = Meteor.users.findOne(user);
	var roles = GetValue(target, ['permissions']);

	return roles ? roles.indexOf(role) !== -1 : false;
});
