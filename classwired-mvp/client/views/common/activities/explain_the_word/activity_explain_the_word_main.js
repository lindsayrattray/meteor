Template.activityExplainTheWord_Main.events({
	'click .activity-selector': function(event, template) {
		Meteor.call('setCurrentActivity', template.data.classroom._id, 'idle');
	}
});

Template.activityExplainTheWord_Main.helpers({
	component: function() {
		var component = Components.findOne({name: this.classroom.currentComponent});
		if(!component)
		{
			return 'no component found matching ' + this.classroom.currentComponent;
		}

		return Template[component.template]({ activity: activity, classroom: this });
	}	
});
