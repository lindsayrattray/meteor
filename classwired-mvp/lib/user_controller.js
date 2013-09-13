UserController = {
	availablePermissions: function() {
		return ['administrator','teacher','student'];
	},

	isAdmin: function() {
		return (Meteor.user() && Meteor.user().username === 'administrator');
	},

	hasPermission: function(permission) {
		return (Meteor.user() && ((Meteor.user().username === 'administrator') || (Meteor.user().permissions && Meteor.user().permissions[permission] == true)))
	}
}