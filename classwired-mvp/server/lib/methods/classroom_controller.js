Meteor.methods({
	createClassroom: function(name, userId) {
		if(!Classrooms.findOne({ name: name }))
		{
			Classrooms.insert({ name: name, owner: userId, currentActivity: 'idle', participants: [], open: true, date_created: Date.parse(new Date) });
		}
	},
	addParticipantToClassroom: function(classroomId, userId) {
		if(Classrooms.findOne(classroomId) && Meteor.users.findOne(userId) && Classrooms.findOne(classroomId).participants.indexOf(userId) == -1)
		{
			Classrooms.update(classroomId, { $push: { participants: userId } });
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