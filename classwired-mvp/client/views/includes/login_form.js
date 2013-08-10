Template.loginForm.events({
	'submit': function() {
		var username = $('#username-input').val();
		Users.insert({
			name: username
		});
		Session.set('username', username);
		Session.set('alert', username);
		alert(username);
		alert(Session.get('username'));
		return false;
	}
});