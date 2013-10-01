Template.activityExplainTheWord_Explain.rendered = function() {
	if(Meteor.user() && Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') === -1)
	{
		Meteor.call('populateItems', Meteor.userId().toString(), this.data.classroom._id);
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
	'click #explain-answer-new': function(event, template) {
		if(Meteor.user() && Meteor.user().permissions.indexOf('teacher') === -1)
		{
			Meteor.call('assignNewItem', Meteor.userId(), template.data.classroom._id);
			Session.set('newItemAssigned', true);
		}
	}
});

Template.activityExplainTheWord_Explain.helpers({
	currentItem: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });
		if(Meteor.user() && Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') === -1 && currentItem)
		{
			return currentItem.item;
		}
	},
	ticked: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true })
		if(currentItem.answered && currentItem.answer)
		{
			return true;
		}
		return false;
	},
	crossed: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true })
		if(currentItem.answered && !currentItem.answer)
		{
			return true;
		}
		return false;
	}
})