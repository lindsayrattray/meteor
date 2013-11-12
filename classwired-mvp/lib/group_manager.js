GroupManager = {
	membersToString: function(members) {
		if(members)
		{
			var memberNames = [];
			var lastElement;
			var result;

			for(memberIndex in members)
			{
				memberNames.push(UserController.idToName(members[memberIndex]));
			}

			if(memberNames.length === 1)
			{
				return memberNames[0];
			}

			lastElement = memberNames.pop();
			result = memberNames.join(', ');
			result = result + ' and ' + lastElement;
			return result;
		}
	},
	getGroupByMember: function(userId, classroomId) {
		return Groups.findOne({ classroomId: classroomId, members: userId });
	},
	createGroup: function(classroomId, userId) {
		if(!Groups.findOne({ classroomId: classroomId, members: userId }));
		{
			Groups.insert({ classroomId: classroomId, members: [userId] });
		}
	},
	addUserByEmail: function(groupId, userToAddEmailAddress) {
		var userToAdd = Meteor.users.find({ "emails.address": userToAddEmailAddress });
		if(userToAdd)
		{
			Groups.update(groupId, { $push: { members: userToAdd._id } });
		}
	},
	moveUserToGroup: function(fromGroupId, toGroupId, userId) {
		var fromGroupMembers = Groups.findOne({ _id: fromGroupId }).members;
		if(fromGroupMembers.indexOf(userId) !== -1)
		{
			Groups.update(fromGroupId, { $pull: { members: userId } });
			Groups.update(toGroupId, { $push: { members: userId } });
			
			if(fromGroupMembers.length === 1)
			{
				Groups.remove(fromGroupId);
			}	
		}
	},
	removeUserFromGroup: function(groupId, userId) {
		var classroomId = Groups.findOne(groupId).classroomId;
		Groups.update(groupId, { $pull: {members: userId } });
		Groups.insert({ classroomId: classroomId, members: [userId] });
	},
	mergeGroups: function(fromGroupId, toGroupId) {
		var fromMembers = Groups.findOne(fromGroupId).members;
		var toMembers = Groups.findOne(toGroupId).members;

		var to = fromMembers.length > toMembers.length ? fromGroupId : toGroupId;
		var from = to === toGroupId ? fromGroupId : toGroupId;
		var members = to === toGroupId ? fromMembers : toMembers;

		for(memberIndex in members)
		{
			Groups.update(to, { $push: { members: members[memberIndex] } });
		}
		Groups.remove(from);
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
}