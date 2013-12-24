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
	}
});