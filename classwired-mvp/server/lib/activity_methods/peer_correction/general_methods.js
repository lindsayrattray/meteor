Meteor.methods({
	peerCorrection_reassignGroupWords: function(activityInstanceId, classroomId) {
		var wordlistItems = PeerCorrection_WordlistItems.find({ classroomId: classroomId, activityInstanceId: activityInstanceId }).fetch();
		var user, group;

		for(itemIndex in wordlistItems)
		{
			user = wordlistItems[itemIndex].userId;
			group = GroupManager.getGroupByMember(user, classroomId);

			if(group)
			{
				PeerCorrection_WordlistItems.update(wordlistItems[itemIndex]._id, { $set: { groupId: group._id } });
			}
		}
	}
});