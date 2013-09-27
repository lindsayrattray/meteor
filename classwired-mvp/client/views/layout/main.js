Deps.autorun(function() {
	var user = Meteor.user();

	if(user)
	{
		var classroomId = Session.get('currentClassroom');
		var classroom = Classrooms.findOne(classroomId);
		Meteor.subscribe('groups', user._id, classroomId);
		if(classroom)
		{
			var currentActivity = Activities.findOne({ name: classroom.currentActivity });
			Meteor.subscribe('classroomGroups', classroomId);
			
			if(currentActivity)
			{
				Meteor.subscribe('components', currentActivity._id);
			}
		}
	}
});