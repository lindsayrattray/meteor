Handlebars.registerHelper('userGroupHasMoreThanOneMember', function(userId) {
	var group = Groups.findOne({ members: userId });
	if(group)
	{
		return group.members.length > 1;
	}
	return false;
});

Handlebars.registerHelper('groupMembers', function(groupId) {
	var group = Groups.findOne(groupId);
	return GroupHandler.membersToString(group.members);
});