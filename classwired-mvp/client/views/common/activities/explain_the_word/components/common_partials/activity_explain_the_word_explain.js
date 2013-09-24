Template.activityExplainTheWord_Explain.rendered = function() {
	if(Meteor.user() && Meteor.user().permissions.indexOf('teacher') === -1)
	{
		var group = Groups.findOne({ members: Meteor.userId() });
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });

		if(!currentItem)
		{
			Meteor.call('assignNewItem', group._id);
			currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });
		}
	}
}

Template.activityExplainTheWord_Explain.events({
	'click #explain-answer-tick': function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });
		var timestamp = new Date();
		ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { answered: true, answer: 'yes', answered_timestamp: timestamp } });
	},
	'click #explain-answer-cross': function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });
		var timestamp = new Date();
		ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { answered: true, answer: 'no', answered_timestamp: timestamp } });
	},
	'click #explain-answer-new': function() {
		var group = Groups.findOne({ members: Meteor.userId() });
		Meteor.call('assignNewItem', group._id);
	}
});

Template.activityExplainTheWord_Explain.helpers({
	currentItem: function() {
		var currentItem = ExplainTheWord_ExplainItems.find({ current: true }).fetch()[0];
		if(currentItem)
		{
			return currentItem.item;
		}
	}
})