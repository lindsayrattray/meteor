Deps.autorun(function () {
	var group = Groups.findOne({ classroomId: CurrentClassroom.getValue(['_id']), members: Meteor.userId() });
	if(group && !CurrentUser.hasRole(Roles.TEACHER))
	{
		Meteor.call('populateItems', Meteor.userId().toString(), CurrentClassroom.getValue(['_id']));
	}
});

Template.activityExplainTheWord_Explain_Student.rendered = function() {
	if(!CurrentUser.hasRole(Roles.TEACHER))
	{
		Meteor.call('populateItems', Meteor.userId().toString(), CurrentClassroom.getValue(['_id']));
	}
}

//TODO make timestamp assigned from server side for canonical timestamp

Template.activityExplainTheWord_Explain_Student.events({
	'click .answer.tick': function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ assigned_to: Meteor.userId() });
		var timestamp = new Date();
		ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { answered: true, answer: true, answered_timestamp: timestamp, answered_by: Meteor.userId() } });
	},
	'click .answer.cross': function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ assigned_to: Meteor.userId() });
		var timestamp = new Date();
		ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { answered: true, answer: false, answered_timestamp: timestamp, answered_by: Meteor.userId() } });
	},
	'click .explain.student .container .new': function(event, template) {
		if(!CurrentUser.hasRole(Roles.TEACHER))
		{
			Meteor.call('assignNewItem', Meteor.userId(), CurrentClassroom.currentActivity.getValue(['_id']), CurrentClassroom.getValue(['_id']));
		}
	}
});

Template.activityExplainTheWord_Explain_Student.helpers({
	currentItem: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']), assigned_to: Meteor.userId() });
		if(!CurrentUser.hasRole(Roles.TEACHER) && currentItem)
		{
			return currentItem.item;
		}
	},
	ticked: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']), assigned_to: Meteor.userId() });
		if(currentItem && currentItem.answered && currentItem.answer)
		{
			return true;
		}
		return false;
	},
	crossed: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']), assigned_to: Meteor.userId() });
		if(currentItem && currentItem.answered && !currentItem.answer)
		{
			return true;
		}
		return false;
	},
	backgroundColor: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']), assigned_to: Meteor.userId() });
		if(currentItem && currentItem.answered)
		{
			return currentItem.answer ? 'answered tick' : 'answered cross';
		}
	}
})