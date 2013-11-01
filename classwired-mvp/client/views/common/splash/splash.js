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
			break;
		case 'name':
			container.removeClass('stage-email stage-password stage-confirm-password').addClass('stage-name');
			break;
		case 'password':
			container.removeClass('stage-email stage-name stage-confirm-password').addClass('stage-password');
			break;
		case 'confirm-password':
			container.removeClass('stage-email stage-name stage-password').addClass('stage-confirm-password');
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
					var user = Meteor.users.findOne({ "emails.address": emailField.value });
					var state = user ? 'login' : 'signup';
					var nextStage = state === 'login' ? 'password' : 'name';

					Session.set('loginState', state);
					Session.set('loginStage', nextStage);
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
						Meteor.loginWithPassword({ email: emailField.value }, passwordField.value, function(error) { debugLogin(error) });
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
						var email = emailField.value;
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
	}
});

Template.splash.helpers({
	loggingIn: function() {
		return Meteor.loggingIn();
	},
	studentName: function() {
		return;
	},
	debug: function() {
		console.log();
	},
	passwordSubmit: function() {
		return Session.get('loginState') === 'login' ? 'Submit' : 'Next';
	}
});