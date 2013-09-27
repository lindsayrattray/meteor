Handlebars.registerHelper('groupHasMoreThanOneMember', function(groupId) {
	var group = Groups.findOne(groupId.toString());
	if(group)
	{
		return group.members.length > 1;
	}
	return false;
});

Handlebars.registerHelper('groupMembers', function(groupId) {
	var group = Groups.findOne(groupId);
	if(group)
	{
		return GroupHandler.membersToString(group.members);
	}
});

Handlebars.registerHelper('userIsGroupMember', function(groupId, userId) {
	return Groups.findOne({ _id: groupId, members: userId });
});