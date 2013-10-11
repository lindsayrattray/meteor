Deps.autorun(function() {
	var classroomId = Session.get('currentClassroom');
	var group = Groups.findOne({ members: Meteor.userId() });

	Meteor.call('reassignGroupWords', classroomId, function(error, result) { return });
});

Deps.autorun(function() {
	var user = Meteor.user() ? Meteor.user()._id : null;
	if(user)
	{	
		var group = Groups.findOne({ members: user, classroomId: Session.get('currentClassroom') });
		group = group ? group._id : null;
		Meteor.subscribe('explainTheWord_WordlistItems', group, Session.get('currentClassroom'), user);
		Meteor.subscribe('explainTheWord_ExplainItems', group, Session.get('currentClassroom'), user);
	}
});

Template.activityExplainTheWord_Main.rendered = function() {
	if(Meteor.user())
	{
		if(Meteor.user().permissions.indexOf('teacher') !== -1)
		{
			Session.set('forwardButton', true);
			Session.set('forwardMenu', 'activityExplainTheWord_UI_Teacher_ForwardMenu');
			Session.set('leftButton', 'activityExplainTheWord_UI_Teacher_LeftButton');
			Session.set('rightButton', 'activityExplainTheWord_UI_Teacher_RightButton')
		}
		else
		{

		}
	}
};

Template.activityExplainTheWord_Main.helpers({
	component: function() {
		var component = Components.findOne({name: this.classroom.currentActivityComponent});
		if(!component)
		{
			return 'no component found matching ' + this.classroom.currentActivityComponent;
		}
		return Template[component.template]({ activity: this.activity, classroom: this.classroom });
	}	
});
