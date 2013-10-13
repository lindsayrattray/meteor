Template.activityExplainTheWord_Explain_Stats_Activity.rendered = function() {
	console.log('foo')
}

Template.activityExplainTheWord_Explain_Stats_Activity.events({
	'click .explain.teacher > ul li a': function(event, template) {
		if(Session.get('explainStudentStat') === this.toString())
		{
			Session.set('explainStudentStat', null);
		}
		else
		{
			Session.set('explainStudentStat', this.toString());
		}
	}
});

Template.activityExplainTheWord_Explain_Stats_Activity.helpers({
	students: function() {
		var groups = Groups.find({ classroomId: this.classroom._id }).fetch();
		var students = [];

		for(groupIndex in groups)
		{
			students.push(groups[groupIndex].members);
		}

		return _.flatten(students);
	},
	currentItem: function(userId) {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ userId: userId, classroomId: Session.get('currentClassroom'), current: true });
		if(currentItem)
		{
			return currentItem.item;
		}
	},
	isCurrentItem: function() {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ userId: Session.get('explainStudentStat'), classroomId: Session.get('currentClassroom'), current: true });
		if(currentItem && this.item === currentItem.item)
		{
			return true;
		}
		return false;
	},
	studentAllItems: function() {
		return ExplainTheWord_ExplainItems.find({ classroomId: Session.get('currentClassroom'), userId: Session.get('explainStudentStat') }, { sort: { current: -1, answered: -1, item: 1 } });
	},
	itemAnswerTime: function() {
		var thisItem = ExplainTheWord_ExplainItems.findOne({ userId: Session.get('explainStudentStat'), classroomId: Session.get('currentClassroom'), item: this.item });
		if(thisItem)
		{
			var time = ((Date.parse(thisItem.answered_timestamp) - Date.parse(thisItem.assigned_timestamp)) / 1000);
			var isAttempting = thisItem.current ? 'currently attempting' : 'not attempted';
			return isNaN(time) ? isAttempting : time;
		}
	},
	itemAnswer: function() {
		if(this.answered)
		{
			return this.answer ? "✓" : "✗";
		}
	},
	itemAnswerColor: function() {
		if(this.answered)
		{
			return this.answer ? 'tick' : 'cross';
		}
	},
	showStatDetails: function(userId) {
		if(userId.toString() === Session.get('explainStudentStat'))
		{
			return true;
		}
		console.log(Session.get('explainStudentState'));
		return false;
	}
});