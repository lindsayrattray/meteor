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

	},
	answeredTick: function(userId, item) {

	},
	answeredCross: function(userId, item) {

	},
	showStatDetails: function(itemId) {
		if(item._id.toString() === CurrentClassroom.currentActivity.uiState.get('explainActivityStat'))
		{
			return true;
		}
		return false;
	}
});