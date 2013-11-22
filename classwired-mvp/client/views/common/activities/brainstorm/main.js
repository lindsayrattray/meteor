Deps.autorun(function() {
	var userId = Meteor.userId();
	var classroomId = Session.get('currentClassroom');

	if(userId)
	{
		var group = GroupManager.getGroupByMember(userId, classroomId);

		Meteor.subscribe('brainstorm_Items', userId, classroomId, CurrentClassroom.currentActivity.get());
	}
});

Template.activityBrainstorm_Main.rendered = function() {
	if(Meteor.user())
	{
		Meteor.subscribe('components', this.data.activity._id);

		if(Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') !== -1)
		{
			Session.set('forwardButton', true);
			Session.set('forwardMenu', 'activityBrainstorm_UI_Teacher_ForwardMenu');
			Session.set('leftButton');
			Session.set('rightButton');
		}

		Session.set('currentContext', 'activityBrainstorm_UI_Context');
	}
};

Template.activityBrainstorm_Main.helpers({
	component: function() {
		if(Meteor.user() && Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') === -1)
		{
			if(this.classroom.state === 'stopped')
			{
				return Template['activityExplainTheWord_Stopped']({ activity: this.activity, classroom: this.classroom });
			}
		}

		var component = Components.findOne(this.classroom.currentActivityComponent);
		if(!component)
		{
			component = Components.findOne({name: 'brainstorm'});
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