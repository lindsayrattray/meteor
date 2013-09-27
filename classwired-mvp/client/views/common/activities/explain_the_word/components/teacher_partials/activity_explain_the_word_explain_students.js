Template.activityExplainTheWord_Explain_Students.events({
	'click #assign-all-new-items': function(event, template) {
		Meteor.call('assignNewItemToAllUsers', template.data.classroom._id);
	},
	'click .assign-one-new-item': function(event, template) {
		Meteor.call('assignNewItem', this.toString(), template.data.classroom._id);
	}
});

Template.activityExplainTheWord_Explain_Students.helpers({
	students: function() {
		var groups = Groups.find({ classroomId: this.classroom._id }).fetch();
		var students = [];

		for(groupIndex in groups)
		{
			students.push(groups[groupIndex].members);
		}

		return _.flatten(students);
	},
	isCurrentItem: function(userId) {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ userId: userId, classroomId: Session.get('currentClassroom'), current: true });
		if(currentItem && this.item === currentItem.item)
		{
			return true;
		}
		return false;
	},
	studentAllItems: function() {
		var explainItems = ExplainTheWord_ExplainItems.find({ classroomId: Session.get('currentClassroom'), userId: this.toString() }, { sort: { item: 1 } }).fetch();
		return ExplainTheWord_ExplainItems.find({ classroomId: Session.get('currentClassroom'), userId: this.toString() }, { sort: { item: 1 } });
	},
	itemAnswerTime: function(userId) {
		var thisItem = ExplainTheWord_ExplainItems.findOne({ userId: userId, classroomId: Session.get('currentClassroom'), item: this.item });
		if(thisItem)
		{
			var time = ((Date.parse(thisItem.answered_timestamp) - Date.parse(thisItem.assigned_timestamp)) / 1000);
			return isNaN(time) ? 'not attempted' : time;
		}
	}
});