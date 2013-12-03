Deps.autorun(function() {
	var userId = Meteor.userId();

	if(userId)
	{
		var group = GroupManager.getGroupByMember(userId, CurrentClassroom.getValue(['_id']));

		Meteor.subscribe('brainstorm_Items', userId, CurrentClassroom.getValue(['_id']), CurrentClassroom.currentActivity.getValue(['_id']));
	}
});

Template.activityBrainstorm_Main.rendered = function() {
	if(Meteor.user())
	{
		if(CurrentUser.hasRole(Roles.TEACHER))
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
		if(CurrentClassroom.currentActivity.getValue(['state']) === 'stopped')
		{
			return Template['activityExplainTheWord_Stopped']({ activity: this.activity, classroom: this.classroom });
		}

		var component = Components.findOne(CurrentClassroom.currentActivity.getValue(['currentComponent']));

		if(!component)
		{
			component = Components.findOne({ name: 'brainstorm' });
			if(component)
			{
				Meteor.call('setCurrentComponent', CurrentClassroom.currentActivity.getValue(['_id']), component._id);
			}
		}
		else
		{
			return Template[component.template]();
		}
	},
	toggleModal: function() {
		if(CurrentClassroom.currentActivity.getValue(['state']) === 'paused')
		{
			return;
		}
		return 'hide';
	}
});