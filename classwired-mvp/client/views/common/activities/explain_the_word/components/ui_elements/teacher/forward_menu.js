Template.activityExplainTheWord_UI_ForwardMenu.events({
	'click .component a': function() {
		Meteor.call('setCurrentComponent', Session.get('currentClassroom'), this.name);
		Session.set('forward_MenuVisible', false);
	}
});

Template.activityExplainTheWord_UI_ForwardMenu.helpers({
	components: function() {
		var classroomId = Session.get('currentClassroom');
		var classroom = Classrooms.findOne(classroomId);
		var activityName = classroom ? classroom.currentActivity : null;
		var activity = activityName ? Activities.findOne({ name: activityName }, { reactive: false }) : null;
		var components = activity ? Components.find({ activityId: activity._id }, { reactive: false }) : null;

		return components;
	}
});