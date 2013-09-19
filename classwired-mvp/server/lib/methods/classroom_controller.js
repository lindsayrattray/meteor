Meteor.methods({
	createClassroom: function(name, userId) {
		if(!Classrooms.findOne({ name: name }))
		{
			Classrooms.insert({ name: name, owner: userId, currentActivity: 'idle', open: true, date_created: Date.parse(new Date) });
		}
	},
	setCurrentActivity: function(classroomId, activityName) {
		var classroom = Classrooms.findOne(classroomId)
		if(classroom && classroom.currentActivity !== activityName && Activities.findOne({ name: activityName }))
		{
			Classrooms.update(classroomId, { $set: { currentActivity: activityName } });
		}
	}
});