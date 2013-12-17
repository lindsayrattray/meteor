Deps.autorun(function() {
	var userId = Meteor.userId();

	if(userId)
	{
		var classroomId = CurrentClassroom.getValue(['_id']);
		var activityInstanceId = CurrentClassroom.currentActivity.getValue(['_id']);
		var group = Groups.findOne({ members: userId });

		Meteor.call('');
		Meteor.call('');
	}
});

Deps.autorun(function() {
	var userId = Meteor.userId();
	var classroomId = CurrentClassroom.getValue(['_id']);
	var activityInstanceId = CurrentClassroom.currentActivity.getValue(['_id']);

	if(userId)
	{
		var group = Groups.findOne({ members: userId });
		group = group ? group._id : null;

		Meteor.subscribe('');
		Meteor.subscribe('');
	}
});

Template.activityPeerCorrection_Main.rendered = function() {
	if(Meteor.userId())
	{
		if(CurrentUser.hasRole(Roles.Teacher))
		{
			//TODO this stuff will eventually be moving into a uiState object or something
			Session.set('forwardButton', true);
			Session.set('forwardMenu', '');
			Session.set('leftButton', '');
			Session.set('rightButton', '');
		}

		Session.set('currentContext', '')
	}
};

Template.activityPeerCorrection_Main.helpers({
	component: function() {
		if(CurrentClassroom.currentActivity.getValue(['state']) === 'stopped')
		{
			return Template['activityPeerCorrection_Stopped']({ activity: this.activity, classroom: this.classroom });
		}

		var component = Components.findOne(CurrentClassroom.currentActivity.getValue(['currentComponent']));

		if(!component)
		{
			component = Components.findOne({ name: 'wordlist' });
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
