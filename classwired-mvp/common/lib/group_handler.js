GroupHandler = {
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
	}
}