function debugLogin(error)
{
	if(error)
	{
		alert(error.reason || "Unknown error");
	}
}

function toggleLoginVisible(loginStage)
{
	var container = $('.container');

	if(loginStage)
	{
		$('.splash .viewport .container').removeClass('hide-login').addClass('show-login');
	}
	else
	{
		$('.splash .viewport .container').removeClass('show-login').addClass('hide-login');
	}
}

function showLoginStage(loginStage)
{
	var container = $('.login-details');

	switch(loginStage)
	{
		case 'email':
			container.removeClass('stage-name stage-password stage-confirm-password').addClass('stage-email');
			$('.login-details div').not('.email').children('input, button').prop('disabled', true);
			$('.login-details .email input').children('input, button').prop('disabled', false);
			break;
		case 'name':
			container.removeClass('stage-email stage-password stage-confirm-password').addClass('stage-name');
			$('.login-details div').not('.name').children('input, button').prop('disabled', true);
			$('.login-details .name input').children('input, button').prop('disabled', false);
			break;
		case 'password':
			container.removeClass('stage-email stage-name stage-confirm-password').addClass('stage-password');
			$('.login-details div').not('.password').children('input, button').prop('disabled', true);
			$('.login-details .password input').children('input, button').prop('disabled', false);
			break;
		case 'confirm-password':
			container.removeClass('stage-email stage-name stage-password').addClass('stage-confirm-password');
			$('.login-details div').not('.confirm-password').children('input, button').prop('disabled', true);
			$('.login-details .confirm-password').children('input, button').prop('disabled', false);
			break;
		default:
			break;
	}
}

Deps.autorun(function() {
	var loginStage = Session.get('loginStage');

	if(!Meteor.loggingIn())
	{
		toggleLoginVisible(loginStage);
		showLoginStage(loginStage);
	}
});

Template.splash.rendered = function() {
	var loginStage = Session.get('loginStage');

	if(!Meteor.loggingIn())
	{
		toggleLoginVisible(loginStage);
		showLoginStage(loginStage);
	}
};

Template.splash.events({
	'submit form': function(event, template) {
		var emailField = template.find('.email input');
		var nameField = template.find('.name input');
		var passwordField = template.find('.password input');
		var confirmPasswordField = template.find('.confirm-password input');

		var currentStage = Session.get('loginStage');
		var currentState = Session.get('loginState');

		event.preventDefault();

		console.log(currentStage);

		if(currentStage)
		{
			if(currentStage === 'email')
			{
				if(emailField.value && emailField.value !== '')
				{
					var user = Meteor.users.findOne({ "emails.address": emailField.value.toLowerCase() });
					var state = user ? 'login' : 'signup';
					var nextStage = state === 'login' ? 'password' : 'name';

					Session.set('loginState', state);
					Session.set('loginStage', nextStage);

					if(user)
					{
						Session.set('loginName', user.profile.name);
					}
				}
				else
				{
					alert('Please enter your email address!');
				}
			}
			else if(currentStage === 'name')
			{
				if(nameField.value && nameField.value !== '')
				{
					Session.set('loginStage', 'password');
					Session.set('loginName', nameField.value);
				}
				else
				{
					alert('Please enter your name!');
				}
			}
			else if(currentStage === 'password')
			{
				if(passwordField.value && passwordField.value !== '')
				{
					if(Session.get('loginState') === 'login')
					{
						Meteor.loginWithPassword({ email: emailField.value.toLowerCase() }, passwordField.value, function(error) { debugLogin(error) });
					}
					else
					{
						Session.set('loginStage', 'confirm-password');
					}
				}
				else
				{
					alert('Please enter your password!');
				}
			}
			else if(currentStage === 'confirm-password')
			{
				if(confirmPasswordField.value && confirmPasswordField.value !== '')
				{
					if(confirmPasswordField.value === passwordField.value)
					{
						var email = emailField.value.toLowerCase();
						Accounts.createUser({
												email: email,
												password: passwordField.value,
												profile: { name: nameField.value }
											},
											function(error)
											{
												var user = Meteor.users.findOne({ "emails.address": email });
												var userId = user ? user._id : null;
												Meteor.call('addUserToRole', userId, 'student');
												debugLogin(error);
											});
					}
					else
					{
						alert('Passwords don\'t match');
					}
				}
				else
				{
					alert('Please confirm your password!')
				}
			}
		}
	},
	'reset form': function(event, template) {
		event.preventDefault();

		$('input').val('');
		Session.set('loginState', null);
		Session.set('loginStage', null);
	},
	'click .container > div > button': function(event, template) {
		Session.set('loginStage', 'email');
	},
});

Template.splash.helpers({
	loggingIn: function() {
		return Meteor.loggingIn();
	},
	studentName: function() {
		return Session.get('loginName');
	},
	debug: function() {
		console.log();
	},
	passwordSubmit: function() {
		return Session.get('loginState') === 'login' ? 'Submit' : 'Next';
	}
});