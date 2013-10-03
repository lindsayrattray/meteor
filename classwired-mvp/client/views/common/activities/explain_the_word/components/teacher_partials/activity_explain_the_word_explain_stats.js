Deps.autorun(function() {
	Meteor.subscribe('explainTheWord_ExplainItemTimes', Session.get('currentClassroom'))
	var items = _.chain(ExplainTheWord_ExplainItems.find({ classroomId: Session.get('currentClassroom' )}, { sort: { item: -1 } }).fetch()).pluck('item').uniq(true).value();

	Meteor.call('calculateTimes', items, Session.get('currentClassroom'));
});

Template.activityExplainTheWord_Explain_Stats.helpers({
	explainItems: function() {
		var explainItems = ExplainTheWord_ExplainItemTimes.find({ classroomId: this.classroom._id }).fetch().sort(function(a, b) { return b.avgTime - a.avgTime });
		return explainItems;
	}
});