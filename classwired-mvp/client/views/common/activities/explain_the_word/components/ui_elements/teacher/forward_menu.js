Template.activityExplainTheWord_UI_Teacher_ForwardMenu.events({
	'click .component a': function() {
		Meteor.call('setCurrentComponent', CurrentClassroom.currentActivity.getValue(['_id']), this._id);
		Session.set('forward_MenuVisible', false);
	},
	'click .play-pause': function(event, template) {
		if(CurrentClassroom.currentActivity.getValue(['state']) === 'paused' || CurrentClassroom.currentActivity.getValue(['state']) === 'stopped')
		{
			//TODO these should be server side methods, but for now leave them client side
			ActivityInstances.update(CurrentClassroom.currentActivity.getValue(['_id']), { $set: { state: 'running' } });
		}
		else
		{
			ActivityInstances.update(CurrentClassroom.currentActivity.getValue(['_id']), { $set: { state: 'paused' } });
		}
	},
	'click .stop': function() {
		if(CurrentClassroom.currentActivity.getValue(['state']) !== 'stopped')
		{
			ActivityInstances.update(CurrentClassroom.currentActivity.getValue(['_id']), { $set: { state: 'stopped' } });
		}
	}
});

Template.activityExplainTheWord_UI_Teacher_ForwardMenu.helpers({
	components: function() {
		var components = Components.find({ activityId: CurrentClassroom.currentActivity.getValue(['activityId']) }, { reactive: false });

		return components;
	},
	classroomPaused: function() {
		if(CurrentClassroom.currentActivity.getValue(['state']) === 'paused' || CurrentClassroom.currentActivity.getValue(['state']) === 'stopped')
		{
			return true;
		}
		return false;
	}
});
