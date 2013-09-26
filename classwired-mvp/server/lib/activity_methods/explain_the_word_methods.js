Meteor.methods({
	reassignGroupWords: function(classroomId) {
		var wordlistItems = ExplainTheWord_WordlistItems.find({ classroomId: classroomId }).fetch();
		var explainItems = ExplainTheWord_WordlistItems.find({ classroomId: classroomId }).fetch();
		var user, group;

		for(itemIndex in wordlistItems)
		{
			user = wordlistItems[itemIndex].userId;
			group = GroupHandler.getGroupByMember(user, classroomId);

			if(group)
			{
				ExplainTheWord_WordlistItems.update(wordlistItems[itemIndex]._id, { $set: { groupId: group._id } });
			}
		}

		for(itemIndex in explainItems)
		{
			user = explainItems[itemIndex].userId;
			group = GroupHandler.getGroupByMember(user, classroomId);

			if(group)
			{
				ExplainTheWord_ExplainItems.update(explainItems[itemIndex]._id, { $set: { groupId: group._id } });
			}
		}
	}
});