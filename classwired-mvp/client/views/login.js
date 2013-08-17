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
		});
	}
});

