Template.activityExplainTheWord_UI_Teacher_ForwardMenu.events({
	'click .component a': function() {
		Meteor.call('setCurrentComponent', Session.get('currentClassroom'), this._id);
		Session.set('forward_MenuVisible', false);
	},
	'click .play-pause': function() {
		var classroomId = Session.get('currentClassroomId');
		var classroom = Classrooms.findOne(classroomId);

		if(classroom.state === 'paused' || classroom.state === 'stopped')
		{
			Classrooms.update(classroomId, { $set: { state: 'running' } });
		}
		else
		{
			Classrooms.update(classroomId, { $set: { state: 'paused' } });
		}
	},
	'click .stop': function() {
		var classroomId = Session.get('currentClassroomId');
		var classroom = Classrooms.findOne(classroomId);

		if(classroom.state !== 'stopped')
		{
			Classrooms.update(classroomId, { $set: { state: 'stopped' } });
		}
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
