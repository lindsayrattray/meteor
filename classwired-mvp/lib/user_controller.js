UserController = {
	availablePermissions: function() {
		return ['administrator','teacher','student'];
	},

	roleExists: function(rolename) {
		return UserController.availablePermissions().indexOf(rolename) !== -1;
	},

	isAdmin: function() {
		return (Meteor.user() && Meteor.user().permissions && Meteor.user().permissions.indexOf('administrator') !== -1);
	},

	userHasRole: function(userId, rolename) {
		var user = Meteor.users.findOne(userId);
		return (user && user.permissions && (user.permissions.indexOf(rolename) !== -1));
	},

	thisUserHasRole: function(rolename) {
		return Meteor.user() ? UserController.userHasRole(Meteor.user()._id, rolename) : false;
	},
	idToName: function(userId) {
		var user = Meteor.users.findOne(userId);
		return user ? user.profile.name : null;
	}
}