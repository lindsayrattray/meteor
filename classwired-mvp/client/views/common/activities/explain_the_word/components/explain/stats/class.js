Deps.autorun(function() {
	Meteor.subscribe('explainTheWord_ExplainItemTimes', Session.get('currentClassroom'))
	var items = _.chain(ExplainTheWord_ExplainItems.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']) }, { sort: { item: -1 } }).fetch()).pluck('item').uniq(true).value();

	Meteor.call('calculateTimes', items, CurrentClassroom.currentActivity.getValue(['_id']), CurrentClassroom.getValue(['_id']));
});

Template.activityExplainTheWord_Explain_Stats_Class.events({
	'click .stats.class ul li a': function(event, template) {
		if(CurrentClassroom.currentActivity.uiState.get('explainItemStatVisible') === this._id)
		{
			CurrentClassroom.currentActivity.uiState.set('explainItemStatVisible', null);
		}
		else
		{
			CurrentClassroom.currentActivity.uiState.set('explainItemStatVisible', this._id);
		}
	}
});

Template.activityExplainTheWord_Explain_Stats_Class.helpers({
	explainItems: function() {
		var explainItems = ExplainTheWord_ExplainItemTimes.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']) }).fetch().sort(function(a, b) { return b.avgTime - a.avgTime });
		return explainItems;
	},
	showStatDetails: function(itemId) {
		if(itemId === CurrentClassroom.currentActivity.uiState.get('explainItemStatVisible'))
		{
			return true;
		}
		return false;
	}
});