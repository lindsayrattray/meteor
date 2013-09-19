var admin = Meteor.users.findOne({username: 'administrator'});
if(!admin)
{
	admin = Accounts.createUser({ email: 'admin@classwired.com', username: 'administrator', password: 'cwAdministrator', profile: { name: "Administrator" } });
	Meteor.users.update(admin, { $set: { permissions: UserController.availablePermissions() } });
}