Deps.autorun(function() {
	var user = Meteor.user() ? Meteor.user()._id: null;
	if(user)
	{	
		var group = Groups.findOne({ members: user, classroomId: Session.get('currentClassroom') });
		group = group ? group._id : null;
		Meteor.subscribe('explainTheWord_WordlistItems', group, Session.get('currentClassroom'), user);
		Meteor.subscribe('explainTheWord_ExplainItems', group, Session.get('currentClassroom'), user);
	}
});

Template.activityExplainTheWord_Main.events({
	'click .activity-selector': function(event, template) {
		Meteor.call('setCurrentActivity', template.data.classroom._id, 'idle');
	}
});

Template.activityExplainTheWord_Main.helpers({
	component: function() {
		var component = Components.findOne({name: this.classroom.currentActivityComponent});
		if(!component)
		{
			return 'no component found matching ' + this.classroom.currentActivityComponent;
		}
		console.log(component);
		return Template[component.template]({ activity: this.activity, classroom: this.classroom });
	}	
});
