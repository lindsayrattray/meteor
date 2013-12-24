Deps.autorun(function() {
	
	var userId = Meteor.userId();

	if(userId)
	{
		var classroomId = CurrentClassroom.getValue(['_id']);
		var activityInstanceId = CurrentClassroom.currentActivity.getValue(['_id'])
		var group = Groups.findOne({ members: userId });

		Meteor.call('reassignGroupWords', activityInstanceId, classroomId, function(error, result) { return });
		Meteor.call('unassignItem', userId, activityInstanceId, classroomId, function() { Meteor.call('populateItems', userId, activityInstanceId, classroomId); });
	}
});

Deps.autorun(function() {
	var userId = Meteor.userId();
	var classroomId = CurrentClassroom.getValue(['_id']);
	var activityInstanceId = CurrentClassroom.currentActivity.getValue(['_id']);

	if(userId)
	{	
		var group = Groups.findOne({ members: userId, classroomId: classroomId });
		group = group ? group._id : null;
		Meteor.subscribe('explainTheWord_WordlistItems', group, classroomId, activityInstanceId, userId);
		Meteor.subscribe('explainTheWord_ExplainItems', group, classroomId, activityInstanceId, userId);
	}
});

Template.activityExplainTheWord_Main.rendered = function() {
	var userId = Meteor.userId();
	var classroomId = CurrentClassroom.getValue(['_id']);
	var activityInstanceId = CurrentClassroom.currentActivity.getValue(['_id']);

	if(userId)
	{
		var group = Groups.findOne({ members: userId, classroomId: classroomId });
		group = group ? group._id : null;

		Meteor.subscribe('explainTheWord_WordlistItems', group, classroomId, activityInstanceId, userId);
		Meteor.subscribe('explainTheWord_ExplainItems', group, classroomId, activityInstanceId, userId);

		if(CurrentUser.hasRole(Roles.TEACHER))
		{
			//TODO this stuff will be moving somewhere into a uistate or something
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
		if(CurrentClassroom.currentActivity.getValue(['state']) === 'stopped')
		{
			return Template['activityExplainTheWord_Stopped']({ activity: this.activity, classroom: this.classroom });
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
