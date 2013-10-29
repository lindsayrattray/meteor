Meteor.methods({
	createClassroom: function(name, userId, description) {
		if(!Classrooms.findOne({ name: name }))
		{
			Classrooms.insert({ name: name, owner: userId, description: description, currentActivity: null, currentActivityComponent: '', open: true, date_created: Date.parse(new Date) });
		}
	},
	setCurrentActivity: function(classroomId, activityId) {
		var classroom = Classrooms.findOne(classroomId);
		if(classroom && classroom.currentActivity !== activityId && Activities.findOne(activityId))
		{
			Classrooms.update(classroomId, { $set: { currentActivity: activityId } });
		}
	},
	setCurrentComponent: function(classroomId, componentId) {
		var classroom = Classrooms.findOne(classroomId);
		if(classroom && classroom.currentActivityComponent !== componentId && Components.findOne(componentId))
		{
			Classrooms.update(classroomId, { $set: { currentActivityComponent: componentId } });
		}
	}
});