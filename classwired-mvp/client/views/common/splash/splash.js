var userName, email, loginState, loginStage;

Template.splash.events({

});

Template.splash.helpers({
	loggingIn: function() {
		return Meteor.loggingIn();
	},
	studentName: function() {
		return userName;
	},
	debug: function() {
		console.log(userName);
		console.log(email);
		console.log(loginState);
		console.log(loginStage);
	}
});