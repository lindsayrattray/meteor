Handlebars.registerHelper('userGroupHasMoreThanOneMember', function(userId) {
	var group = Groups.findOne({ members: userId });
	if(group)
	{
		return group.members.length > 1;
	}
	return false;
});