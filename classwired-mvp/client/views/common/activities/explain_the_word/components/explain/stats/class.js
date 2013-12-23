var calcTime = function(explainObject) {
	return ((explainObject.answered_timestamp - explainObject.assigned_timestamp) / 1000) | 0;
}

Deps.autorun(function() {
	Meteor.subscribe('ExplainTheWord_ExplainGroupTimes', CurrentClassroom.currentActivity.getValue(['_id']));
	var items = _.chain(ExplainTheWord_ExplainItems.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']) }, { sort: { item: -1 } }).fetch()).pluck('item').uniq(true).value();

	Meteor.call('explainTheWord_calculateGroupTimes', CurrentClassroom.currentActivity.getValue(['_id']));
});

Template.activityExplainTheWord_Explain_Stats_Class.events({
	'click .stats.class ul li a': function(event, template) {
		if(CurrentClassroom.currentActivity.uiState.get('explainGroupStat') === this._id)
		{
			CurrentClassroom.currentActivity.uiState.set('explainGroupStat', null);
		}
		else
		{
			CurrentClassroom.currentActivity.uiState.set('explainGroupStat', this._id);
		}
	}
});

Template.activityExplainTheWord_Explain_Stats_Class.helpers({
	groups: function() {
		return ExplainTheWord_ExplainGroupTimes.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']) });
	},
	explainItems: function(groupId) {
		return ExplainTheWord_ExplainItems.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']), groupId: groupId }).fetch().sort(function(a, b) { return calcTime(b) - calcTime(a) });
	},
	time: function(explainItem) {
		return calcTime(explainItem);
	},
	showStatDetails: function(groupId) {
		if(groupId === CurrentClassroom.currentActivity.uiState.get('explainGroupStat'))
		{
			return true;
		}
		return false;
	}
});