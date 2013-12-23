Deps.autorun(function() {
	Meteor.subscribe('explainTheWord_ExplainItemTimes', CurrentClassroom.currentActivity.getValue(['_id']));
	var items = _.chain(ExplainTheWord_ExplainItems.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']) }, { sort: { item: -1 } }).fetch()).pluck('item').uniq(true).value();

	Meteor.call('explainTheWord_calculateItemTimes', CurrentClassroom.currentActivity.getValue(['_id']));
});

Template.activityExplainTheWord_Explain_Stats_Activity.events({
	'click .stats.activity > ul li a': function(event, template) {
		if(CurrentClassroom.currentActivity.uiState.get('explainActivityStat') === this._id.toString())
		{
			CurrentClassroom.currentActivity.uiState.set('explainActivityStat', null);
		}
		else
		{
			CurrentClassroom.currentActivity.uiState.set('explainActivityStat', this._id.toString());
		}
	}
});

Template.activityExplainTheWord_Explain_Stats_Activity.helpers({
	explainItems: function() {
		return ExplainTheWord_ExplainItemTimes.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']) }, { sort: { averageTime: -1 } });
	},
	groups: function() {
		return Groups.find({ classroomId: CurrentClassroom.getValue(['_id']) });
	},
	itemAnswerTime: function(groupId, item) {
		var thisItem = ExplainTheWord_ExplainItems.findOne({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']), groupId: groupId, item: item });
		var answered = GetValue(thisItem, ['answered_timestamp']);
		var assigned = GetValue(thisItem, ['assigned_timestamp']);

		return ((answered - assigned) / 1000).toFixed(2);
	},
	showStatDetails: function(itemId) {

		if(itemId.toString() === CurrentClassroom.currentActivity.uiState.get('explainActivityStat'))
		{
			return true;
		}
		return false;
	},
	debug: function(data) {
		console.log(data);
	}
});