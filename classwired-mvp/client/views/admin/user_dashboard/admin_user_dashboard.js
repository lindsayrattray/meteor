Template.adminUserDashboard.helpers({
	users: function() {
		return Meteor.users.find();
	},
});