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
	'click #logout-btn': function()
	{
		Meteor.logout(function(error) { debugLogin(error); });
	},
	'submit': function(event, template)
	{
		var emailAddress = template.find('#email-field').value;
		var name = template.find('#name-field').value;
		var password = template.find('#password-field').value;
		var user = Meteor.users.findOne({ emails: { $elemMatch: { address: emailAddress } } });

		if(user)
		{
			if(!password)
			{
				$('#login-email-container').addClass('hidden');
				$('#login-password-container').removeClass('hidden');
			}
			else
			{
				console.log(emailAddress + ' ' + password);
				Meteor.loginWithPassword({email: emailAddress}, password, function(error) { debugLogin(error) });
			}
		}
		else
		{
			if(!name && !password)
			{
				$('#login-email-container').addClass('hidden');
				$('#login-name-container').removeClass('hidden');
			}
			else if(name && !password)
			{
				$('#login-name-container').addClass('hidden');
				$('#login-password-container').removeClass('hidden');
			}
			else
			{
				console.log(emailAddress + ' ' + name + ' ' + password);
				Accounts.createUser({ email: emailAddress, password: password, profile: { name: name } });
			}
		}

		event.preventDefault();
	}
});
