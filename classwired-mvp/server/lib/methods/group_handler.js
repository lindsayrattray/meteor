Meteor.methods({
	createGroup: function(classroomId, userId) {
		if(!Groups.findOne({ classroomId: classroomId, members: userId }))
		{
			Groups.insert({ classroomId: classroomId, members: [userId] });
		}
	},
	addUserToGroup: function(groupId, userToAddEmailAddress) {
		var userToAdd = Meteor.users.find({ "emails.address": userToAddEmailAddress });
		if(userToAdd)
		{
			Groups.update(groupId, { $push: { members: userToAdd._id } });
		}
	},
	removeUserFromGroup: function(groupId, userId) {
		var classroom = Groups.findOne(groupId).classroomId;
		Groups.update(groupId, { $pull: { members: userId } });
		Groups.insert({ classroomId: classroom, members: [userId] });
	},
	mergeGroups: function(fromGroupId, toGroupId) {
		var fromMembers = Groups.findOne(fromGroupId).members;
		var toMembers = Groups.findOne(toGroupId).members;

		if(fromMembers > toMembers)
		{
			for(memberIndex in toMembers)
			{
				Groups.update(fromGroupId, { $push: { members: fromMembers[memberIndex] } });
			}
			Groups.remove(toGroupId);
		}
		else
		{
			for(memberIndex in fromMembers)
			{
				Groups.update(toGroupId, { $push: { members: fromMembers[memberIndex] } });
			}
			Groups.remove(fromGroupId);
		}
	},
	disbandGroup: function(groupId) {
		var groupToDisband = Groups.findOne(groupId);
		var members = groupToDisband.members;

		for(memberIndex in members)
		{
			Groups.insert({ classroomId: groupToDisband.classroomId, members: [members[memberIndex]] });
		}

		Groups.remove(groupId);
	}
});