Template.loginForm.events({
	'submit': function() {
		var username = $('#username-input').val();
		var userId = Users.insert({
			name: username
		});

		Session.set('username', username);
		Session.set('userId', userId);
		Session.set('alert', username);
		
		return false;
	}
});