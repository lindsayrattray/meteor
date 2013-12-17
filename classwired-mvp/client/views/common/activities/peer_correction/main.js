Deps.autorun(function() {
	var userId = Meteor.userId();

	if(userId)
	{
		var classroomId = CurrentClassroom.getValue(['_id']);
		var activityInstanceId = CurrentClassroom.currentActivity.getValue(['_id']);
		var group = Groups.findOne({ members: userId });

		Meteor.call('peerCorrection_reassignGroupWords', activityInstanceId, classroomId, function(error, result) { return });
		Meteor.call('peerCorrection_unassignItem', userId, activityInstanceId, classroomId, function() { Meteor.call('peerCorrection_populateItems', userId, activityInstanceId, classroomId); });
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

		Meteor.subscribe('PeerCorrection_WordlistItems', group, classroomId, activityInstanceId, userId);
		Meteor.subscribe('PeerCorrection_CorrectionItems', group, classroomId, activityInstanceId, userId);
	}
});

Template.activityPeerCorrection_Main.rendered = function() {
	if(Meteor.userId())
	{
		if(CurrentUser.hasRole(Roles.Teacher))
		{
			//TODO this stuff will eventually be moving into a uiState object or something
			Session.set('forwardButton', true);
			Session.set('forwardMenu', 'activityPeerCorrection_UI_Teacher_ForwardMenu');
			Session.set('leftButton', 'activityPeerCorrection_UI_Teacher_LeftButton');
			Session.set('rightButton', 'activityPeerCorrection_UI_Teacher_RightButton');
		}

		Session.set('currentContext', 'activityPeerCorrection_UI_Context')
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
