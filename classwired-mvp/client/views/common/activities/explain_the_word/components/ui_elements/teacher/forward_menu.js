Template.activityExplainTheWord_UI_Teacher_ForwardMenu.events({
	'click .component a': function() {
		Meteor.call('setCurrentComponent', Session.get('currentClassroom'), this._id);
		Session.set('forward_MenuVisible', false);
	}
});

Template.activityExplainTheWord_UI_Teacher_ForwardMenu.helpers({
	components: function() {
		var classroomId = Session.get('currentClassroom');
		var classroom = Classrooms.findOne(classroomId);
		var activityId = classroom ? classroom.currentActivity : null;
		var components = activityId ? Components.find({ activityId: activityId }, { reactive: false }) : null;

		return components;
	}
});
