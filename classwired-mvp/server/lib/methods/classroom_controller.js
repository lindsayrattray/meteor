Meteor.methods({
	createClassroom: function(name, userId) {
		if(Classrooms.findOne({ name: name }))
		{

		}
		else
		{
			Classrooms.insert({name: name, owner: userId, currentActivity: 'classroom', participants: [], open: true});
		}
	}
});