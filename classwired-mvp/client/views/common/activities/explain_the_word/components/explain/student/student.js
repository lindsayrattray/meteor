Template.activityExplainTheWord_Explain_Student.rendered = function() {
	if(Meteor.user() && Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') === -1)
	{
		Meteor.call('populateItems', Meteor.userId().toString(), this.data.classroom._id);
	}
}

Template.activityExplainTheWord_Explain_Student.events({
	'click .answer.tick': function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });
		var timestamp = new Date();
		ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { answered: true, answer: true, answered_timestamp: timestamp } });
	},
	'click .answer.cross': function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });
		var timestamp = new Date();
		ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { answered: true, answer: false, answered_timestamp: timestamp } });
	},
	'click .explain.student .container .new': function(event, template) {
		if(Meteor.user() && Meteor.user().permissions.indexOf('teacher') === -1)
		{
			Meteor.call('assignNewItem', Meteor.userId(), template.data.classroom._id);
		}
	}
});

Template.activityExplainTheWord_Explain_Student.helpers({
	currentItem: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });
		if(Meteor.user() && Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') === -1 && currentItem)
		{
			return currentItem.item;
		}
	},
	ticked: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true })
		if(currentItem && currentItem.answered && currentItem.answer)
		{
			return true;
		}
		return false;
	},
	crossed: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true })
		if(currentItem && currentItem.answered && !currentItem.answer)
		{
			return true;
		}
		return false;
	},
	backgroundColor: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ current: true });
		if(currentItem && currentItem.answered)
		{
			return currentItem.answer ? 'answered tick' : 'answered cross';
		}
	}
})