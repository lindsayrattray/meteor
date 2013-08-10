Template.loginForm.events({
	'submit': function() {
		var username = $('#username-input').val();
		Users.insert({
			name: username
		});
	}
});