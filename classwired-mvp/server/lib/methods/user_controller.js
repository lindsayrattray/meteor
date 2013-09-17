Meteor.methods({
	addUserToRole: function(userId, rolename) {
		if(UserController.roleExists(rolename) && !UserController.userHasRole(userId, rolename))
		{
			Meteor.users.update(userId, { $push: { permissions: rolename } });
		}
	},
	removeUserFromRole: function(userId, rolename) {
		if(UserController.roleExists(rolename) && UserController.userHasRole(userId, rolename))
		{
			Meteor.users.update(userId, { $pull: { permissions: rolename } });
		}
	},
	setUserCurrentRoom: function(userId, classroomId) {
		var classroom = Classrooms.findOne(classroomId);
		if(classroom && classroom.open)
		{
			Meteor.users.update(userId, { $set: { currentRoom: classroomId } });
		}
		else if(!classroomId)
		{
			Meteor.users.update(userId, { $set: { currentRoom: classroomId } });
		}
	}
});