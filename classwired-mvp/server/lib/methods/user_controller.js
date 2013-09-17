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
});