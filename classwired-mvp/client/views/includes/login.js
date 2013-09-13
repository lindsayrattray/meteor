function debugLogin(error)
{
	if(error)
	{
		alert(error.reason || "Unknown error")
	}
	else
	{
		console.log("event success")
	}
}

Template.login.events({
	'click #signup-btn': function() 
	{
		var options = {};

		options.username = $('#username-field').val();
		options.password = $('#password-field').val();

		Accounts.createUser(options, function(error) { debugLogin(error); });
	},
	'click #login-btn': function()
	{
		var username = {username: $('#username-field').val()};
		var password = $('#password-field').val();

		Meteor.loginWithPassword(username, password, function(error, result) { debugLogin(error); });
	},
	'click #logout-btn': function()
	{
		Meteor.logout(function(error) { debugLogin(error); });
	}
});
