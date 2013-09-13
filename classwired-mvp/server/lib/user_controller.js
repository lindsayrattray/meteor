// Create admin role if none exists
Meteor.startup(function() {
	var admin = Meteor.users.findOne({username: 'administrator'});
	if(!admin)
	{
		admin = Accounts.createUser({ username: 'administrator', password: 'cwAdministrator', profile: { name: "Administrator" } });
		Meteor.users.update(admin, { $set: { permissions: UserController.availablePermissions()[0] } });
	}
});