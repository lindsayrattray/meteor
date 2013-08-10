Template.loginForm.events({
	'submit': function() {
		var username = $('#username-input').val();
		var userId = Users.insert({
			name: username
		});

		Session.set('username', username);
		Session.set('userId', userId);

		return false;
	}
});

Template.loginForm.helpers({
	isLoggedIn: function() {
		return Session.get('userId') == true;
	}
});