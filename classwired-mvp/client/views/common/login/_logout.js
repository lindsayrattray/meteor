Template.logout.events({
	'click .logout': function()
	{
		Meteor.logout();
	}
});