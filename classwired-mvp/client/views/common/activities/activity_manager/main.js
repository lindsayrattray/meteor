Template.activityIdle.helpers({
	activityName: function() {
		return this.activity.name;
	},
	activities: function() {
		return Activities.find();
	}
});

Template.activityIdle.events({
	'click .activity-selector': function(event, template) {
		Meteor.call('setCurrentActivity', template.data.classroom._id, this.name);
	}
})