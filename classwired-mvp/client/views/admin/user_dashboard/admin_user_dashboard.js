Template.adminUserDashboard.events({
	'click .user a': function(event, template) {
		var data = Session.get('admin_users_showDetails') !== this._id ? this._id : null;
		Session.set('admin_users_showDetails', data);
	},
	'change .role-checkbox': function(event, template) {
		var userId = Session.get('admin_users_showDetails');
		var user = Meteor.users.findOne(userId);

		if(user)
		{
			if(!user.permissions || user.permissions.indexOf(this.toString()) === -1)
			{
				Meteor.call('addUserToRole', userId, this.toString());
			}
			else
			{
				Meteor.call('removeUserFromRole', userId, this.toString());
			}
		}
	},
	'click .delete': function(event, template)
	{
		var user = Meteor.users.findOne(this);
		if(user && Meteor.user() !== user)
		{
			Meteor.call('deleteUser', this);
		}
	}
});

Template.adminUserDashboard.helpers({
	users: function() {
		return Meteor.users.find({}, { sort: { "emails.address": 1 } });
	},
	showDetails: function(user) {
		var result = Session.get('admin_users_showDetails');
		if(user)
		{
			return result === user._id;
		}
		return false;
	}
});