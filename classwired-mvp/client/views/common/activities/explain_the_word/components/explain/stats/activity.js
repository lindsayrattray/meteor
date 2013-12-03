Template.activityExplainTheWord_Explain_Stats_Activity.events({
	'click .stats.activity > ul li a': function(event, template) {
		if(Session.get('explainStudentStat') === this.toString())
		{
			CurrentClassroom.currentActivity.uiState.set('explainStudentStat', null);
		}
		else
		{
			CurrentClassroom.currentActivity.uiState.set('explainStudentStat', this.toString());
		}
	}
});

Template.activityExplainTheWord_Explain_Stats_Activity.helpers({
	students: function() {
		var groups = Groups.find({ classroomId: CurrentClassroom.getValue(['_id']) }).fetch();
		var students = [];

		for(groupIndex in groups)
		{
			students.push(groups[groupIndex].members);
		}

		return _.flatten(students);
	},
	currentItem: function(userId) {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ classroomId: CurrentClassroom.getValue(['_id']), activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']), assigned_to: userId });
		if(currentItem)
		{
			return currentItem.item;
		}
	},
	isCurrentItem: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ assigned_to: CurrentClassroom.currentActivity.uiState.get('explainStudentStat'), classroomId: CurrentClassroom.getValue(['_id']), activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id'])});
		if(currentItem && this.item === currentItem.item)
		{
			return true;
		}
		return false;
	},
	studentAllItems: function() {
		var group = GroupManager.getGroupByMember(Session.get('explainStudentStat'), Session.get('currentClassroom'));
		var groupId = group ? group._id : null;
		return ExplainTheWord_ExplainItems.find({ classroomId: Session.get('currentClassroom'), groupId: groupId, $or: [{ answered_by: Session.get('explainStudentStat') }, { assigned_to: Session.get('explainStudentStat') }] }, { sort: { assigned_to: -1, answered: -1, item: 1 } });
	},
	itemAnswerTime: function() {
		var thisItem = ExplainTheWord_ExplainItems.findOne({ answered_by: Session.get('explainStudentStat'), classroomId: Session.get('currentClassroom'), item: this.item });
		if(thisItem)
		{
			var time = ((Date.parse(thisItem.answered_timestamp) - Date.parse(thisItem.assigned_timestamp)) / 1000);
			var isAttempting = thisItem.assigned_to ? 'currently attempting' : 'not attempted';
			return isNaN(time) ? isAttempting : time;
		}
	},
	answeredTick: function() {
		if(this.answered)
		{
			return this.answer;
		}
	},
	answeredCross: function() {
		if(this.answered)
		{
			return !this.answer;
		}
	},
	showStatDetails: function(userId) {
		if(userId.toString() === Session.get('explainStudentStat'))
		{
			return true;
		}
		return false;
	}
});