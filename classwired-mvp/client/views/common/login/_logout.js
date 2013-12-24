Template.logout.events({
	'click .logout': function()
	{
		Session.set('main_MenuVisible', false);
		CurrentUser.logout();
	}
});