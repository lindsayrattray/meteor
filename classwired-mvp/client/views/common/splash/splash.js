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
		options.confirmPassword = template.find('.confirm-password input');

		event.preventDefault();

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
		options.confirmPassword = template.find('.confirm-password input');

		loginHandler.doLogin()
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