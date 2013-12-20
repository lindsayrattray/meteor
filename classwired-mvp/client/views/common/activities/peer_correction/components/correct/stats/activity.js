Deps.autorun(function() {
	Meteor.subscribe('PeerCorrection_CorrectionItemStats', CurrentClassroom.currentActivity.getValue(['_id']));
	var items = _.chain(PeerCorrection_CorrectionItemStats.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']) }, { sort: { item: -1 } }).fetch()).pluck('item').uniq(true).value();

	Meteor.call('peerCorrection_calculateItemAverages', CurrentClassroom.currentActivity.getValue(['_id']), function() { return; });
});

Template.activityPeerCorrection_Correct_Stats_Activity.events({
	'click .stats.activity > ul li a': function(event, template) {
		if(CurrentClassroom.currentActivity.uiState.get('correctActivityStat') === this._id.toString())
		{
			CurrentClassroom.currentActivity.uiState.set('correctActivityStat', null);
		}
		else
		{
			CurrentClassroom.currentActivity.uiState.set('correctActivityStat', this._id.toString());
		}
	}
});

Template.activityPeerCorrection_Correct_Stats_Activity.helpers({
	students: function() {
		var groups = Groups.find({ classroomId: CurrentClassroom.getValue(['_id']) }).fetch();

		var students = [];

		for(groupIndex in groups)
		{
			students.push(groups[groupIndex].members);
		}

		return _.flatten(students);
	},
	words: function() {
		return PeerCorrection_CorrectionItemStats.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']) });
	},
	answeredTick: function(userId, item) {
		var answeredItem = PeerCorrection_CorrectionItems.findOne({ item: item.item, answered_by: userId});

		if(GetValue(answeredItem, ['answered']))
		{
			return answeredItem.answer;
		}
		return false;
	},
	answeredCross: function(userId, item) {
		var answeredItem = PeerCorrection_CorrectionItems.findOne({ item: item.item, answered_by: userId});

		if(GetValue(answeredItem, ['answered']))
		{
			return !answeredItem.answer;
		}
		return false;
	},
	showStatDetails: function(item) {
		if(item._id.toString() === CurrentClassroom.currentActivity.uiState.get('correctActivityStat'))
		{
			return true;
		}
		return false;
	},
	tickPercentage: function(item) {
		return (item.correct / ((item.correct + item.incorrect) | 1) * 100) + '%';
	},
	crossPercentage: function(item) {
		return (item.incorrect / ((item.correct + item.incorrect) | 1) * 100) + '%';
	},
	debug: function(arg) {
		console.log(arg);
	}
});