Meteor.methods({
	peerCorrection_populateItems: function(userId, activityInstanceId, classroomId) {
		var group = GroupManager.getGroupByMember(userId, classroomId);
		var groupId = group ? group._id : null;
		if(groupId)
		{
			var correctionItems = _.map(PeerCorrection_CorrectionItems.find({ classroomId: classroomId, activityInstanceId: activityInstanceId, groupId: groupId }).fetch(), function(item) { return { item: item.item, userId: userId } });
			var wordlistItems = _.chain(PeerCorrection_WordlistItems.find({ classroomId: classroomId, activityInstanceId: activityInstanceId }).fetch()).map(function(item) { return { item: item.item, userId: userId }; }).uniq().reject(function(item) { return _.findWhere(correctionItems, { item: item.item, userId: item.userId }) }).value();
			var currentItem = PeerCorrection_CorrectionItems.findOne({ assigned_to: userId.toString(), classroomId: classroomId, activityInstanceId: activityInstanceId });

			console.log('correction Items');
			console.log(correctionItems);
			console.log();
			console.log('wordlistItems');
			console.log(wordlistItems);

			if(wordlistItems.length > 0)
			{
				for(itemIndex in wordlistItems)
				{
					PeerCorrection_CorrectionItems.insert({ item: wordlistItems[itemIndex].item, userId: wordlistItems[itemIndex].userId, classroomId: classroomId, activityInstanceId: activityInstanceId, groupId: groupId, assigned_to: null, assigned_timestamp: null, answered: false, answer: null, answered_by: null });
				}
			}

			if(!currentItem)
			{
				Meteor.call('peerCorrection_assignNewItem', userId, activityInstanceId, classroomId);
			}
		}
	},
	peerCorrection_assignNewItem: function(userId, activityInstanceId, classroomId) {
		var group = GroupManager.getGroupByMember(userId, classroomId);
		var groupId = group ? group._id : null;
		var correctionItems = PeerCorrection_CorrectionItems.find({ groupId: groupId, classroomId: classroomId, activityInstanceId: activityInstanceId }).fetch();
		var availableItems = _.reject(correctionItems, function(item) { return (!_.isNull(item.assigned_to) || item.answered) });
		var currentItem = _.findWhere(correctionItems, { assigned_to: userId });
		var timestamp = new Date();

		if(currentItem)
		{
			PeerCorrection_CorrectionItems.update(currentItem._id, { $set: { assigned_to: null } });
		}

		if(availableItems.length > 0)
		{
			var newItem = _.sample(availableItems);
			var existingItem = PeerCorrection_CorrectionItems.findOne(newItem);

			timestamp = existingItem.assigned_timestamp ? existingItem.assigned_timestamp : timestamp;
			PeerCorrection_CorrectionItems.update(newItem._id, { $set: { assigned_to: userId, assigned_timestamp: timestamp } });
		}
	},
	peerCorrection_unassignItem: function(userId, activityInstanceId, classroomId) {
		var currentItem = PeerCorrection_CorrectionItems.findOne({ assigned_to: userId.toString(), classroomId: classroomId, activityInstanceId: activityInstanceId });

		if(currentItem)
		{
			PeerCorrection_CorrectionItems.update(currentItem._id, { $set: { assigned_to: null } });
		}
	}
});