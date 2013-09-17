Meteor.methods({
	createClassroom: function(name, userId) {
		if(Classrooms.findOne({ name: name }))
		{

		}
		else
		{
			Classrooms.insert({name: name, owner: userId, currentActivity: 'classroom', participants: [], open: true});
		}
	},
	addParticipantToClassroom: function(classroomId, userId) {
		if(Classrooms.findOne(classroomId) && Meteor.users.findOne(userId))
		{
			Classrooms.update(classroomId, { $push: { participants: userId } });
		}
	}
});