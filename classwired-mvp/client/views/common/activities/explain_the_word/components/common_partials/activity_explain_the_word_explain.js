Template.activityExplainTheWord_Explain.rendered = function() {
	if(Meteor.user() && Meteor.user().permissions.indexOf('teacher') === -1)
	{
		var group = Groups.findOne({ members: Meteor.user()._id });
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });

		if(!currentItem)
		{
			Meteor.call('assignNewItem', group._id);
			currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });
		}
	}
}

Template.activityExplainTheWord_Explain.helpers({
	currentItem: function() {
		var currentItem = ExplainTheWord_ExplainItems.find({ current: true }).fetch()[0];
		if(currentItem)
		{
			return currentItem.item;
		}
	}
})