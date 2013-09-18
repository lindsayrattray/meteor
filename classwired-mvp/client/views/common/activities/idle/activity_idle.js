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
		template.data.classroom.currentActivity = this.name;
	}
})