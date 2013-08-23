Template.login.events({
	'click #signup-btn': function() 
	{
		var options = {};

		options.username = $('#username-field').val();
		options.password = $('#password-field').val();

		Accounts.createUser(options, function(error) 
		{
			if(error)
			{
				alert(error.reason || "Unknown error");
			}
			else
			{
				console.log('signed up successfully');
			}
		});
	},
	'click #login-btn': function()
	{
		var username = {username: $('#username-field').val()};
		var password = $('#password-field').val();

		Meteor.loginWithPassword(username, password, function(error, result) 
		{
			if(error)
			{
				alert(error.reason || "Unknown Error");
			}
			else
			{
				console.log('logged in successfully');
			}
		});
	},
	'click #logout-btn': function()
	{
		Meteor.logout(function(error)
		{
			if(error)
			{
				alert(error.reason || "Unknown Error");
			}
			else
			{
				console.log('logged out successfully');
			}
		});
	}
});

