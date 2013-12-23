Deps.autorun(function () {
	var group = Groups.findOne({ classroomId: CurrentClassroom.getValue(['_id']), members: Meteor.userId() });
	if(group && !CurrentUser.hasRole(Roles.TEACHER))
	{
		Meteor.call('populateItems', Meteor.userId().toString(), CurrentClassroom.currentActivity.getValue(['_id']), CurrentClassroom.getValue(['_id']));
	}
});

Template.activityExplainTheWord_Explain_Student.rendered = function() {
	if(!CurrentUser.hasRole(Roles.TEACHER))
	{
		Meteor.call('populateItems', Meteor.userId().toString(), CurrentClassroom.currentActivity.getValue(['_id']), CurrentClassroom.getValue(['_id']));
	}
}

//TODO make timestamp assigned from server side for canonical timestamp

Template.activityExplainTheWord_Explain_Student.events({
	'click .explain.student .container .new': function(event, template) {
		if(!CurrentUser.hasRole(Roles.TEACHER))
		{
			Meteor.call('assignNewItem', Meteor.userId(), CurrentClassroom.currentActivity.getValue(['_id']), CurrentClassroom.getValue(['_id']));
		}
	}
});

Template.activityExplainTheWord_Explain_Student.helpers({
	currentItem: function() {
		var thisItem = ExplainTheWord_ExplainItems.findOne({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']), assigned_to: Meteor.userId() });
		console.log(thisItem);
		if(!CurrentUser.hasRole(Roles.TEACHER) && thisItem)
		{
			return thisItem.item;
		}
	}
})