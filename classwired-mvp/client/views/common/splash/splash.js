function alertError(error)
{
	if(error)
	{
		alert(error.reason || "Unknown error");
	}
}

CurrentUser.onSignup = function(options, error)
{
	var user = Meteor.users.findOne({ "emails.address": options.email });
	var userId = user ? user._id : null;
	Meteor.call('addUserToRole', userId, 'student');
	alertError(error);
};

CurrentUser.onLogin = function(options, error)
{
	alertError(error)
}

var loginHandler = new LoginManager(CurrentUser);

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

var showLoginStage = {
	$container: $('.login-details'),

	email: function() {
		$container.removeClass('stage-name stage-password stage-confirm-password').addClass('stage-email');
		$('.login-details div').not('.email').children('input, button').prop('disabled', true);
		$('.login-details .email input').children('input, button').prop('disabled', false);
	},

	name: function() {
		$container.removeClass('stage-email stage-password stage-confirm-password').addClass('stage-name');
		$('.login-details div').not('.name').children('input, button').prop('disabled', true);
		$('.login-details .name input').children('input, button').prop('disabled', false);
	},

	password: function() {
		$container.removeClass('stage-email stage-name stage-confirm-password').addClass('stage-password');
		$('.login-details div').not('.password').children('input, button').prop('disabled', true);
		$('.login-details .password input').children('input, button').prop('disabled', false);
	},

	confirmPassword: function() {
		$container.removeClass('stage-email stage-name stage-password').addClass('stage-confirm-password');
		$('.login-details div').not('.confirm-password').children('input, button').prop('disabled', true);
		$('.login-details .confirm-password').children('input, button').prop('disabled', false);
	}
};

Deps.autorun(function() {
	var currentStage = loginHandler.loginState.reactiveCurrentStage();

	console.log(currentStage);

	if(!Meteor.loggingIn())
	{
		toggleLoginVisible(CurrentUser.uiState.loginStage);
		showLoginStage;
	}
});

Template.splash.rendered = function() {
	if(!Meteor.loggingIn())
	{
		toggleLoginVisible(CurrentUser.uiState.loginStage);
		showLoginStage;
	}
};

Template.splash.events({
	'submit form': function(event, template) {
		var options = {};
		options.email = template.find('.email input').value;
		options.name = template.find('.name input').value;
		options.password = template.find('.password input').value;
		options.confirmPassword = template.find('.confirm-password input');

		event.preventDefault();

		$('input').blur();
		document.activeElement.blur();

		LoginHandler.doLogin(options);

		/*if(CurrentUser.uiState.loginStage)
		{
			if(CurrentUser.uiState.loginStage === 'email')
			{
				if(emailField.value && emailField.value !== '')
				{
					var user = Meteor.users.findOne({ "emails.address": emailField.value.toLowerCase() });
					var state = user ? LoginState.LOGIN : LoginState.SIGNUP;
					var nextStage = CurrentUser.uiState.loginState === LoginState.LOGIN ? LoginStage.PASSWORD : LoginStage.NAME;

					CurrentUser.uiState.loginState = state;
					CurrentUser.uiState.loginStage = nextStage;

					if(user)
					{
						CurrentUser.uiState.loginName = user.profile.name;
					}
				}
				else
				{
					alert('Please enter your email address!');
				}
			}
			else if(CurrentUser.uiState.loginStage === LoginStage.NAME)
			{
				if(nameField.value && nameField.value !== '')
				{
					CurrentUser.uiState.loginStage = LoginStage.PASSWORD;
					CurrentUser.uiState.loginName = user.profile.name;
				}
				else
				{
					alert('Please enter your name!');
				}
			}
			else if(CurrentUser.uiState.loginStage === LoginStage.PASSWORD)
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
		}*/
	},
	'reset form': function(event, template) {
		event.preventDefault();

		$('input').val('');
		loginHandler.loginState.reset();
	},
	'click .container > div > button': function(event, template) {
		var options = {};
		options.email = template.find('.email input').value;
		options.name = template.find('.name input').value;
		options.password = template.find('.password input').value;
		options.confirmPassword = template.find('.confirm-password input');

		loginHandler.doLogin()
		console.log(loginHandler);
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