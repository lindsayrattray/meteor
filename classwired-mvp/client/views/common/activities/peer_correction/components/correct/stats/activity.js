Deps.autorun(function() {
	Meteor.subscribe('PeerCorrection_CorrectionItemStats', CurrentClassroom.getValue(['_id']), CurrentClassroom.currentActivity.getValue(['_id']));
	var items = _.chain(PeerCorrection_CorrectionItemStats.find({ activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']) }, { sort: { item: -1 } }).fetch()).pluck('item').uniq(true).value();

	Meteor.call('peerCorrection_CalculateItemAverages', CurrentClassroom.currentActivity.getValue(['_id']), function() { return; });
});

Template.activityPeerCorrection_Correct_Stats_Activity.events({
	'click .stats.activity > ul li a': function(event, template) {
		if(Session.get('explainStudentStat') === this.toString())
		{
			CurrentClassroom.currentActivity.uiState.set('explainActivityStat', null);
		}
		else
		{
			CurrentClassroom.currentActivity.uiState.set('explainActivityStat', this.toString());
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

		if(answeredItem.answered)
		{
			return answeredItem.answer;
		}
		return false;
	},
	answeredCross: function(userId, item) {
		var answeredItem = PeerCorrection_CorrectionItems.findOne({ item: item.item, answered_by: userId});

		if(answeredItem.answered)
		{
			return !answeredItem.answer;
		}
		return false;
	},
	showStatDetails: function(itemId) {
		if(item._id.toString() === CurrentClassroom.currentActivity.uiState.get('explainActivityStat'))
		{
			return true;
		}
		return false;
	}
});