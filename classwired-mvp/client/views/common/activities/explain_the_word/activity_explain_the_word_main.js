
Template.activityExplainTheWordMain.events({
	'click .activity-selector': function(event, template) {
		Meteor.call('setCurrentActivity', template.data.classroom._id, 'idle');
	}
})