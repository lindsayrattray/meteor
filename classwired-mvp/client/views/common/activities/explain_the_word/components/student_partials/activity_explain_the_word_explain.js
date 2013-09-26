Template.activityExplainTheWord_Explain.rendered = function() {
	if(Meteor.user() && Meteor.user().permissions.indexOf('teacher') === -1)
	{
		if(Session.get('newItemAssigned'))
		{
			Session.set('newItemAssigned', false);
		}
		else
		{
			var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });

			if(!currentItem)
			{
				Meteor.call('assignNewItem', Meteor.userId());
			}
		}
	}
}

Template.activityExplainTheWord_Explain.events({
	'click #explain-answer-tick': function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });
		var timestamp = new Date();
		ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { answered: true, answer: true, answered_timestamp: timestamp } });
	},
	'click #explain-answer-cross': function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });
		var timestamp = new Date();
		ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { answered: true, answer: false, answered_timestamp: timestamp } });
	},
	'click #explain-answer-new': function() {
		if(Meteor.user() && Meteor.user().permissions.indexOf('teacher') === -1)
		{
			Meteor.call('assignNewItem', Meteor.userId());
			Session.set('newItemAssigned', true);
		}
	}
});

Template.activityExplainTheWord_Explain.helpers({
	currentItem: function() {
		var currentItem = ExplainTheWord_ExplainItems.find({ current: true }).fetch()[0];
		if(Meteor.user() && Meteor.user().permissions.indexOf('teacher') === -1 && currentItem)
		{
			return currentItem.item;
		}
	}
})