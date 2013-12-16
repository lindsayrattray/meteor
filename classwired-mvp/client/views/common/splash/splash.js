function alertError(error)
{
	if(error)
	{
		alert(error.reason || "Unknown error");
	}
}

CurrentUser.setOnSignup(function(options, error) {
	var userId = Meteor.userId();
	Meteor.call('addUserToRole', userId, 'student');
	Meteor.logoutOtherClients();
	alertError(error);
});

CurrentUser.setOnLogin(function(options, error) {
	Meteor.logoutOtherClients();
	alertError(error);
});

CurrentUser.setOnLogout(function(error) {
	window.location = location.host;
	location.reload(true);
	alertError(error);
});

var loginHandler = new LoginManager(CurrentUser);

function toggleLoginVisible(loginStage)
{
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

	email: function() {
		$('.login-details').removeClass('stage-name stage-password stage-confirm-password').addClass('stage-email');
		$('.login-details div').not('.email').children('input, button').prop('disabled', true);
		$('.login-details .email').children('input, button').prop('disabled', false);
	},

	name: function() {
		$('.login-details').removeClass('stage-email stage-password stage-confirm-password').addClass('stage-name');
		$('.login-details div').not('.name').children('input, button').prop('disabled', true);
		$('.login-details .name').children('input, button').prop('disabled', false);
	},

	password: function() {
		$('.login-details').removeClass('stage-email stage-name stage-confirm-password').addClass('stage-password');
		$('.login-details div').not('.password').children('input, button').prop('disabled', true);
		$('.login-details .password').children('input, button').prop('disabled', false);
	},

	confirmPassword: function() {
		$('.login-details').removeClass('stage-email stage-name stage-password').addClass('stage-confirm-password');
		$('.login-details div').not('.confirm-password').children('input, button').prop('disabled', true);
		$('.login-details .confirm-password').children('input, button').prop('disabled', false);
	},

	home: function() {
		$('.login-details').removeClass('stage-email stage-name stage-password stage-confirm-password');
		$('.login-details div').children('input, button').prop('disabled', true);
	},
};

Deps.autorun(function() {
	var currentStage = loginHandler.loginState.reactiveCurrentStage();

	if(!Meteor.loggingIn())
	{
		toggleLoginVisible(currentStage);
		showLoginStage[currentStage || 'home']();
	}
});

Template.splash.rendered = function() {
	var currentStage = loginHandler.loginState.reactiveCurrentStage();

	if(!Meteor.loggingIn())
	{
		toggleLoginVisible(currentStage);
		showLoginStage[currentStage || 'home']();
	}
};

Template.splash.events({
	'submit form': function(event, template) {
		var options = {};
		options.email = template.find('.email input').value;
		options.name = template.find('.name input').value;
		options.password = template.find('.password input').value;
		options.confirmPassword = template.find('.confirm-password input').value;

		event.preventDefault();

		var matchedUser = Meteor.users.findOne({ "emails.address": options.email });

		if(matchedUser)
		{
			CurrentUser.uiState.set('loginName', GetValue(matchedUser, ['profile', 'name']));
		}
		else if(options.name)
		{
			CurrentUser.uiState.set('loginName', options.name);
		}

		$('input').blur();
		document.activeElement.blur();

		loginHandler.doLogin(options);
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
		options.confirmPassword = template.find('.confirm-password input').value;

		loginHandler.doLogin()
	},
});

Template.splash.helpers({
	loggingIn: function() {
		return Meteor.loggingIn();
	},
	studentName: function() {
		return CurrentUser.uiState.get('loginName');
	},
	debug: function() {
		console.log();
	},
	passwordSubmit: function() {
		return Session.get('loginState') === 'login' ? 'Submit' : 'Next';
	}
});