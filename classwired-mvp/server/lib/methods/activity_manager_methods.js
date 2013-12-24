Meteor.methods({
	addActivity: function(classroom, activity, timestamp) {
		var thisClassroom = Classrooms.findOne(classroom);
		var thisActivity = Activities.findOne(activity);
		
		if(classroom && activity)
		{
			var newInstance = {
				classroomId: thisClassroom._id,
				activityId: thisActivity._id,
				created_timestamp: timestamp
			};

			var instanceCheck = ActivityInstances.findOne(newInstance);
			if(!instanceCheck)
			{
				newInstance.currentComponent = null;

				var newInstanceId = ActivityInstances.insert(newInstance);
				return newInstanceId;
			}
		}
	},
	setCurrentActivity: function(classroom, activityInstance, timestamp)
	{
		var thisClassroom = Classrooms.findOne(classroom);
		var thisActivity = ActivityInstances.findOne(activityInstance);

		if(thisClassroom && thisActivity)
		{
			Classrooms.update(thisClassroom._id, { $set: { currentActivity: thisActivity._id } });
			ActivityInstances.update(thisActivity._id, { $set: { attempt_timestamp: timestamp } });
		}
		else if(thisClassroom)
		{
			Classrooms.update(thisClassroom._id, { $set: { currentActivity: null } });
		}
	},
	setCurrentComponent: function(activityInstance, componentId) {
		var thisInstance = ActivityInstances.findOne(activityInstance);
		if(thisInstance && thisInstance.currentComponent !== componentId && Components.findOne(componentId))
		{
			ActivityInstances.update(thisInstance._id, { $set: { currentComponent: componentId } });
		}
	}
});