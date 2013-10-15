Meteor.methods({
	createClassroom: function(name, userId) {
		if(!Classrooms.findOne({ name: name }))
		{
			Classrooms.insert({ name: name, owner: userId, currentActivity: null, currentActivityComponent: '', open: true, date_created: Date.parse(new Date) });
		}
	},
	setCurrentActivity: function(classroomId, activityId) {
		var classroom = Classrooms.findOne(classroomId);
		if(classroom && classroom.currentActivity !== activityId && Activities.findOne({ _id: activityId }))
		{
			Classrooms.update(classroomId, { $set: { currentActivity: activityId } });
		}
	},
	setCurrentComponent: function(classroomId, componentName) {
		var classroom = Classrooms.findOne(classroomId);
		if(classroom && classroom.currentActivityComponent !== componentName && Components.findOne({ name: componentName }))
		{
			Classrooms.update(classroomId, { $set: { currentActivityComponent: componentName } });
		}
	}
});