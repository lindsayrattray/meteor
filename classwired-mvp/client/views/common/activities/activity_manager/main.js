Template.activityManager.helpers({
	activities: function() {
		return Activities.find();
	}
});

Template.activityManager.events({
	'click .activity-manager ul li a': function(event, template) {
		Meteor.call('setCurrentActivity', template.data.classroom._id, this._id);
	}
});