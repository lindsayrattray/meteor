Deps.autorun(function() {
	var user = Meteor.user();

	if(user)
	{
		var classroom = Session.get('currentClassroom');
		Meteor.subscribe('groups', user._id, classroom);
		if(classroom)
		{
			var currentClassroom = Classrooms.findOne(classroom);
			var currentActivity = Activities.findOne({ name: currentClassroom.currentActivity });
			Meteor.subscribe('classroomGroups', classroom);
			Meteor.subscribe('components', currentActivity);
		}
	}
});