Meteor.methods({
	createClassroom: function(name, user, description) {
		if(!Classrooms.findOne({ name: name }))
		{
			Classrooms.insert({ name: name, owner: user._id, description: description, currentActivity: null, currentActivityComponent: '', open: true, date_created: Date.parse(new Date) });
		}
	},
	deleteClassroom: function(classroom, user)
	{
		var target = Classrooms.findOne(classroom);
		if(target)
		{
			Classrooms.remove(target._id);
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