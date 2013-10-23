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
		event.preventDefault();

		Meteor.loginWithPassword({ email: $emailField.val() }, $passwordField.val(), function(error) { debugLogin(error) });
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

		Accounts.createUser({
								email: $emailField.val(),
								password: $passwordField.val(),
								profile: { name: $nameField.val() } 
							},
							function(error) 
							{
								var user = Meteor.users.findOne({ "emails.address": $emailField.val() });
								var userId = user ? user._id : null;
								Meteor.call('addUserToRole', userId, 'student');
								debugLogin(error);
							});

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
	/*'submit .login form': function(event, template)
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
	}*/
});
