// Create admin role if none exists
Meteor.startup(function() {
	var admin = Meteor.users.findOne({username: 'administrator'});
	if(!admin)
	{
		admin = Accounts.createUser({ email: 'admin@classwired.com', username: 'administrator', password: 'cwAdministrator', profile: { name: "Administrator" } });
		Meteor.users.update(admin, { $set: { permissions: [UserController.availablePermissions()[0], UserController.availablePermissions()[1], UserController.availablePermissions()[2]] } });
	}
});

Meteor.methods({
	addUserToRole: function(userId, rolename) {
		if(UserController.roleExists(rolename) && !UserController.userHasRole(userId, rolename))
		{
			var permissions = Meteor.users.findOne(userId).permissions;
			if(permissions)
			{
				permissions.push(rolename);
			}
			else
			{
				permissions = [rolename];
			}

			Meteor.users.update(userId, { $set: { permissions: permissions } });
		}
	},
	removeUserFromRole: function(userId, rolename) {
		if(UserController.roleExists(rolename) && UserController.userHasRole(userId, rolename))
		{
			var permissions = Meteor.users.findOne(userId).permissions;
			permissions.splice(permissions.indexOf(rolename), 1);

			Meteor.users.update(userId, { $set: { permissions: permissions } });
		}
	}
})