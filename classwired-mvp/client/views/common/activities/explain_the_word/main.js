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
		Meteor.subscribe('components', this.data.activity._id);

		if(Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') !== -1)
		{
			Session.set('forwardButton', true);
			Session.set('forwardMenu', 'activityExplainTheWord_UI_Teacher_ForwardMenu');
			Session.set('leftButton', 'activityExplainTheWord_UI_Teacher_LeftButton');
			Session.set('rightButton', 'activityExplainTheWord_UI_Teacher_RightButton');
		}

		Session.set('currentContext', 'activityExplainTheWord_UI_Context');
	}
};

Template.activityExplainTheWord_Main.helpers({
	component: function() {
		if(Meteor.user() && Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') === -1)
		{
			if(this.classroom.state === 'stopped')
			{
				return Template['activityExplainTheWord_Stopped']({activity: this.activity, classroom: this.classroom});
			}
		}

		var component = Components.findOne(this.classroom.currentActivityComponent);
		if(!component)
		{
			component = Components.find({ name: 'wordlist' }).fetch()[0];
			if(component)
			{
				Meteor.call('setCurrentComponent', this.classroom._id, component._id);
			}
		}
		else
		{
			return Template[component.template]({ activity: this.activity, classroom: this.classroom });
		}
	},
	toggleModal: function() {
		if(this.classroom.state === 'paused')
		{
			return;
		}
		return 'hide';
	}

});
