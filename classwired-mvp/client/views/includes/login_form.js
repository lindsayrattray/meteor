Template.loginForm.events({
	'submit': function() {
		var username = $('#username-input').val();
		var userId = Users.insert({
			name: username
		});

		Session.set('username', username);
		Session.set('userId', userId);
		Meteor.subscribe('userInputs', username)

		return false;
	},
	'click #logout': function() {
		Session.set('username', undefined);
		Session.set('userId', undefined);
	}
});

Template.loginForm.helpers({
	isLoggedIn: function() {
		return !(Session.equals('userId', undefined))
	}
});