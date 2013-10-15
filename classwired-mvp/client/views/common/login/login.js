function debugLogin(error)
{
	if(error)
	{
		alert(error.reason || "Unknown error")
	}
	else
	{
		
	}
}

Deps.autorun(function() {
	var loginState = Session.get('loginState');
	var $nameField = $('.login').find('.name');
	var $cancelButton = $('.login').find('.cancel');

	if(loginState === 'signup')
	{
		$nameField.removeClass('invisible').addClass('visible');
		$cancelButton.removeClass('invisible').addClass('visible');
	}
	else
	{
		$nameField.removeClass('visible').addClass('invisible');
		$cancelButton.removeClass('visible').addClass('invisible');
	}
});

Template.login.events({
	'click .login form div .signup': function(event, template)
	{
		Session.set('loginState', 'signup');
	},
	'reset .login form': function(event, template)
	{
		Session.set('loginState', 'login');

		event.preventDefault();
	},
	'submit .login form': function(event, template)
	{
		var loginState = Session.get('loginState');
		var nameField = template.find('.name input');
		var emailField = template.find('.email input');
		var passwordField = template.find('.password input');

		var emailAddress = emailField.value;
		var name = nameField.value;
		var password = passwordField.value;

		event.preventDefault();

		if(loginState === 'signup')
		{
			Accounts.createUser({   email: emailAddress,
									password: password,
									profile: { name: name } },
									function(error) { 
														var userId = Meteor.users.findOne({ "emails.address": emailAddress });
														Meteor.call('addUserToRole', userId, 'student');
														debugLogin(error);
													});
		}
		else
		{
			Meteor.loginWithPassword({ email: emailAddress }, password, function(error) { debugLogin(error) });
		}
	}
});
