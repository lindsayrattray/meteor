// Create admin role if none exists
Meteor.startup(function() {
	var admin = Meteor.users.findOne({username: 'administrator'});
	if(!admin)
	{
		Accounts.createUser({username: 'administrator', password: '', profile: { name: "Administrator" } });
	}
});