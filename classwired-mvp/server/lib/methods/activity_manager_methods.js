Meteor.methods({
	addActivity: function(classroom, activity) {
		var thisClassroom = Classrooms.findOne(classroom);
		var thisActivity = Activities.findOne(activity);
		
		if(classroom && activity)
		{
			var newInstance = {
				classroomId: thisClassroom._id,
				activityId: thisActivity._id,
				timestamp: new Date()
			};

			var instanceCheck = ActivityInstances.findOne(newInstance);
			if(!instanceCheck)
			{
				var newInstanceId = ActivityInstances.insert(newInstance);
				return newInstanceId;
			}
		}
	},
	setCurrentActivity: function(classroom, activityInstance)
	{
		var thisClassroom = Classrooms.findOne(classroom);
		var thisActivity = ActivityInstances.findOne(activityInstance);

		if(thisClassroom && thisActivity)
		{
			Classrooms.update(thisClassroom._id, { $set: { currentActivity: thisActivity._id } });
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