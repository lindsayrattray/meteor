Meteor.methods({
	createGroup: function(classroomId, userId) {
		Groups.insert({ classroomId: classroomId, members: [userId] });
	},
	addUserToGroup: function(groupId, userToAddEmailAddress) {
		var userToAdd = Meteor.users.find({ "emails.address": userToAddEmailAddress });
		if(userToAdd)
		{
			Groups.update(groupId, { $push: { members: userToAdd._id } });
		}
	},
	removeUserFromGroup: function(groupId, userId) {
		Groups.update(groupId, { $pull: { members: userId } });
	},
	mergeGroups: function(fromGroupId, toGroupId) {
		var fromMembers = Groups.findOne(fromGroupId).members;
		var toMembers = Groups.findOne(toGroupId).members;

		if(fromMembers > toMembers)
		{
			for(member in toMembers)
			{
				Groups.update(fromGroupId, { $push: { members: member } });
			}
			Groups.remove(toGroupId);
		}
		else
		{
			for(member in fromMembers)
			{
				Groups.update(toGroupId, { $push: { members: member } });
			}
			Groups.remove(fromGroupId);
		}
	},
	disbandGroup: function(groupId) {
		var groupToDisband = Groups.findOne(groupId);
		var members = groupToDisband.members;

		for(member in members)
		{
			Groups.insert({ classroomId: groupToDisband.classroomId, members: [member] });
		}

		Groups.remove(groupId);
	}
});