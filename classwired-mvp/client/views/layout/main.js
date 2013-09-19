Deps.autorun(function() {
	var user = Meteor.user();

	if(user)
	{
		var classroom = Session.get('currentClassroom');
		Meteor.subscribe('groups', user._id, classroom);
		if(classroom)
		{
			Meteor.subscribe('classroomGroups', classroom);
		}
	}
});