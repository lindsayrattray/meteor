Meteor.subscribe('systemUsers');

Handlebars.registerHelper('isAdmin', function() {
	return UserController.isAdmin();
});

Handlebars.registerHelper('currentUserId', function() {
	return Meteor.userId().toString();
});

Handlebars.registerHelper('isCurrentUser', function(userId) {
	var currentUser = Meteor.user();
	if(currentUser)
	{
		return currentUser._id === userId;
	}
});

Handlebars.registerHelper('isNotCurrentUser', function(userId) {
	var currentUser = Meteor.user();
	if(currentUser)
	{
		return currentUser._id !== userId;
	}
});

Handlebars.registerHelper('isCurrentUserOrRole', function(userId, rolename) {
	var currentUser = Meteor.user();
	if(currentUser)
	{
		return currentUser._id === userId || currentUser.permissions.indexOf(rolename) !== -1;
	}
});

Handlebars.registerHelper('availablePermissions', function() {
	return UserController.availablePermissions();
});

Handlebars.registerHelper('profileName', function(userId) {
	var user = Meteor.users.find(userId).fetch()[0];
	if(user && user.profile && user.profile.name)
	{
		return user.profile.name;
	}
});

Handlebars.registerHelper('thisProfileName', function() {
	if(Meteor.user() && Meteor.user().profile && Meteor.user().profile.name)
	{
		return Meteor.user().profile.name;
	}
});

Handlebars.registerHelper('emailAddress', function(user) {
	if(user && user.emails)
	{
		return user.emails[0].address;
	}
});

Handlebars.registerHelper('thisUserHasRole', function(rolename) {
	return UserController.thisUserHasRole(rolename);
});