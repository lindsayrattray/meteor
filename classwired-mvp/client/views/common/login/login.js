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
				$('#login-password-container').removeClass('hidden').focus();
				$('#password-field').focus();
			}
			else
			{
				Meteor.loginWithPassword({ email: emailAddress }, password, function(error) { debugLogin(error) });
			}
		}
		else
		{
			if(!name && !password)
			{
				$('#login-email-container').addClass('hidden');
				$('#login-name-container').removeClass('hidden').focus();
				$('#name-field').focus();
			}
			else if(name && !password)
			{
				$('#login-name-container').addClass('hidden');
				$('#login-password-container').removeClass('hidden').focus();
				$('#password-field').focus();
			}
			else
			{
				Accounts.createUser({ email: emailAddress, password: password, profile: { name: name }, permissions: ['student'] }, function()  { 
																																					var userId = Meteor.users.findOne({ "emails.address": emailAddress });
																																					console.log(Meteor.users.findOne({ "emails.address": emailAddress }));
																																					Meteor.call('addUserToRole', userId, 'student'); 
																																				});
			}
		}

		event.preventDefault();
	}
});
