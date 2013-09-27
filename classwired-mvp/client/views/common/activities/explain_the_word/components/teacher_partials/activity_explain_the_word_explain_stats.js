Meteor.subscribe('explainTheWord_ExplainItemTimes')

Deps.autorun(function() {
	var items = _.chain(ExplainTheWord_ExplainItems.find({}, { sort: { item: -1 } }).fetch()).pluck('item').uniq(true).value();

	Meteor.call('calculateTimes', items, Session.get('currentClassroom'));
});

Template.activityExplainTheWord_Explain_Stats.rendered = function() {
	
};

Template.activityExplainTheWord_Explain_Stats.helpers({
	explainItems: function() {
		var explainItems = ExplainTheWord_ExplainItemTimes.find().fetch().sort(function(a, b) { return b.avgTime - a.avgTime });
		return explainItems;
	}
});