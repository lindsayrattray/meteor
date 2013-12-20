Deps.autorun(function() {
	Meteor.subscribe('PeerCorrection_CorrectionUserStats', CurrentClassroom.currentActivity.getValue(['_id']));
	var items = _.chain(PeerCorrection_CorrectionUserStats.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']) }, { sort: { item: -1 } }).fetch()).pluck('item').uniq(true).value();

	Meteor.call('peerCorrection_calculateUserAverages', CurrentClassroom.currentActivity.getValue(['_id']), function() { return; });
});

Template.activityPeerCorrection_Correct_Stats_Class.events({
	'click .stats.class > ul li a': function(event, template) {
		if(CurrentClassroom.currentActivity.uiState.get('explainClassStat') === this._id.toString())
		{
			CurrentClassroom.currentActivity.uiState.set('explainClassStat', null);
		}
		else
		{
			CurrentClassroom.currentActivity.uiState.set('explainClassStat', this._id.toString());
		}
	}
});

Template.activityPeerCorrection_Correct_Stats_Class.helpers({
	students: function() {
		return PeerCorrection_CorrectionUserStats.find();
	},
	words: function() {
		return PeerCorrection_CorrectionItemStats.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']) });
	},
	showStatDetails: function(item) {
		if(item._id.toString() === CurrentClassroom.currentActivity.uiState.get('explainClassStat'))
		{
			return true;
		}
		return false;
	},
	avgCorrect: function(item) {
		return (item.correct / ((item.correct + item.incorrect) | 1) * 100) + '%';
	},
	avgIncorrect: function(item) {
		return (item.incorrect / ((item.correct + item.incorrect) | 1) * 100) + '%';
	}
});