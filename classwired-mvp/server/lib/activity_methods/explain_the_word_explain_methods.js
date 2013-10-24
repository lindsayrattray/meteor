Meteor.methods({
	populateItems: function(userId, classroomId) {
		var group = GroupManager.getGroupByMember(userId, classroomId);
		var groupId = group ? group._id : null;
		if(groupId)
		{
			var explainItems = _.pluck(ExplainTheWord_ExplainItems.find({ classroomId: classroomId, groupId: groupId }).fetch(), 'item');
			var wordlistItems = _.chain(ExplainTheWord_WordlistItems.find({ classroomId: classroomId }).fetch()).pluck('item').uniq().difference(explainItems).value();
			var currentItem = ExplainTheWord_ExplainItems.findOne({ assigned_to: userId.toString(), classroomId: classroomId });

			if(wordlistItems.length > 0)
			{
				for(itemIndex in wordlistItems)
				{
					ExplainTheWord_ExplainItems.insert({ item: wordlistItems[itemIndex], classroomId: classroomId, groupId: groupId, assigned_to: null, assigned_timestamp: null, answered: false, answer: null, answered_by: null });
				}
			}

			if(!currentItem)
			{
				Meteor.call('assignNewItem', userId, classroomId);
			}
		}
	},
	assignNewItem: function(userId, classroomId) {
		var group = GroupManager.getGroupByMember(userId, classroomId);
		var groupId = group ? group._id : null;
		var explainItems = ExplainTheWord_ExplainItems.find({ groupId: groupId, classroomId: classroomId }).fetch();
		var availableItems = _.reject(explainItems, function(item) { return !(_.isNull(item.assigned_to) || item.answered) });
		var currentItem = _.findWhere(explainItems, { assigned_to: userId };
		var timestamp = new Date();

		if(currentItem)
		{
			ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { assigned_to: null } });
		}

		if(availableItems.length > 0)
		{
			var newItem = _.sample(availableItems);
			var existingItem = ExplainTheWord_ExplainItems.findOne(newItem);

			timestamp = existingItem.assigned_timestamp ? existingItem.assigned_timestamp : timestamp;
			ExplainTheWord_ExplainItems.update(newItem._id, { $set: { assigned_to: userId, assigned_timestamp: timestamp } });
		}
	},
	unassignItem: function(userId, classroomId) {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ assigned_to: userId.toString(), classroomId: classroomId });

		if(currentItem)
		{
			ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { assigned_to: null } });
		}
	}
});