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

function setLoginView(loginState)
{
	var $loginModal = $('.modal.login');
	var $signupModal = $('.modal.signup');

	if(loginState === 'signup')
	{
		$loginModal.addClass('hide');
		$signupModal.removeClass('hide');
	}
	else if(loginState === 'login')
	{
		$loginModal.removeClass('hide');
		$signupModal.addClass('hide');
	}
	else
	{
		$loginModal.addClass('hide');
		$signupModal.addClass('hide');
	}
}

Deps.autorun(function() {
	var loginState = Session.get('loginState');
	
	setLoginView(loginState);
});

Template.login.rendered = function() {
	var loginState = Session.get('loginState');
	
	setLoginView(loginState);
};

Template.login.events({
	'click button.signup': function(event, template)
	{
		Session.set('loginState', 'signup');
	},
	'click button.login': function(event, template)
	{
		Session.set('loginState', 'login');
	},
	'submit .modal.login form': function(event, template)
	{
		var $emailField = $('.modal.login input.email');
		var $passwordField = $('.modal.login input.password');

		Meteor.loginWithPassword({ email: $emailField.val() }, $passwordField.val(), function(error) { debugLogin(error) });

		$emailField.val('');
		$passwordField.val('');

		Session.set('loginState', null);

		event.preventDefault();
	},
	'reset .modal.login form': function(event, template)
	{
		var $emailField = $('.modal.login input.email');
		var $passwordField = $('.modal.login input.password');

		$emailField.val('');
		$passwordField.val('');

		Session.set('loginState', null);

		event.preventDefault();
	},
	'submit .modal.signup form': function(event, template)
	{
		var $nameField = $('.modal.signup input.name');
		var $emailField = $('.modal.signup input.email');
		var $passwordField = $('.modal.signup input.password');

		var email = $emailField.val();
		var name = $nameField.val();
		var password = $passwordField.val();

		Accounts.createUser({
								email: email,
								password: password,
								profile: { name: name } 
							},
							function(error) 
							{
								var user = Meteor.users.findOne({ "emails.address": email });
								var userId = user ? user._id : null;
								Meteor.call('addUserToRole', userId, 'student');
								debugLogin(error);
							});

		$nameField.val('');
		$emailField.val('');
		$passwordField.val('');

		Session.set('loginState', null);

		event.preventDefault();
	},
	'reset .modal.signup form': function(event, template)
	{
		var $nameField = $('.modal.signup input.name');
		var $emailField = $('.modal.signup input.email');
		var $passwordField = $('.modal.signup input.password');

		$nameField.val('');
		$emailField.val('');
		$passwordField.val('');

		Session.set('loginState', null);

		event.preventDefault();
	}
});
