Meteor.methods({
	setCurrentActivity: function(classroom, activity) {
		var classroom = Classrooms.findOne(classroom);
		var activity = Activities.findOne(activity);
		console.log(classroom);
		console.log(activity);

		
		/*if(classroom && classroom.currentActivity !== activityId && Activities.findOne(activityId))
		{
			Classrooms.update(classroomId, { $set: { currentActivity: activityId } });
		}*/
	},
	setCurrentComponent: function(classroomId, componentId) {
		var classroom = Classrooms.findOne(classroomId);
		if(classroom && classroom.currentActivityComponent !== componentId && Components.findOne(componentId))
		{
			Classrooms.update(classroomId, { $set: { currentActivityComponent: componentId } });
		}
	}
});