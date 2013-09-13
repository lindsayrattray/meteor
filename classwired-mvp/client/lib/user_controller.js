Meteor.subscribe('systemUsers');

Handlebars.registerHelper('isAdmin', function() {
	return UserController.isAdmin();
});

Handlebars.registerHelper('profileName', function() {
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

Handlebars.registerHelper('hasPermission', function(permission) {
	return UserController.hasPermission(permission);
});