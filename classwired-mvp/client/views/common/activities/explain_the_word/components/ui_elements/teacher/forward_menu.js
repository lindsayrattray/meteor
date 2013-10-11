Template.activityExplainTheWord_UI_ForwardMenu.rendered = function() {
	
};

Template.activityExplainTheWord_UI_ForwardMenu.events({
	'click .component a': function() {
		console.log('foo')
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
