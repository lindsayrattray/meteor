UserController = {
	availablePermissions: function() {
		return { administrator: 'administrator role',
				 teacher: 	   	'teacher role',
				 student:       'student role'};
	},

	isAdmin: function() {
		return (Meteor.user() && Meteor.user().username === 'administrator');
	},

	hasPermission: function(permission) {
		return (Meteor.user() && ((Meteor.user().username === 'administrator') || (Meteor.user().permissions && Meteor.user().permissions[permission] == true)))
	}
}