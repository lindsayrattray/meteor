var ensureUniqueItem = function(wordlistItems, explainItems, currentItem)
{
	var explained = _.chain(explainItems).pluck('item').uniq().value();

	if(wordlistItems.length <= explained.length)
	{
		return null;
	}
	else
	{
		var current = currentItem ? currentItem.item : '';
		var possibleItems = _.chain(wordlistItems).pluck('item').uniq().difference(explained).without(current).value();
		var resultItem = _.chain(possibleItems).shuffle().first().value();

		var result = _.findWhere(wordlistItems, { item: resultItem });
		return result;
	}
}

Meteor.methods({
	populateItems: function(userId, classroomId) {
		var group = GroupManager.getGroupByMember(userId, classroomId);
		var groupId = group ? group._id : null;
		var explainItems = _.pluck(ExplainTheWord_ExplainItems.find({ classroomId: classroomId, groupId: groupId }).fetch(), 'item');
		var wordlistItems = _.chain(ExplainTheWord_WordlistItems.find({ classroomId: classroomId }).fetch()).pluck('item').uniq().difference(explainItems).value();
		var currentItem = ExplainTheWord_ExplainItems.findOne({ assigned_to: userId.toString(), classroomId: classroomId });

		if(wordlistItems.length > 0)
		{
			for(itemIndex in wordlistItems)
			{
				ExplainTheWord_ExplainItems.insert({ item: wordlistItems[itemIndex], classroomId: classroomId, groupId: groupId, assigned_to: null, assigned_timestamp: null, answered: false, answer: null, answered_by: null });
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
		var wordlistItems = ExplainTheWord_WordlistItems.find({ classroomId: classroomId }).fetch();
		var explainItems = _.reject(ExplainTheWord_ExplainItems.find({ groupId: groupId, answered: true, classroomId: classroomId }).fetch(), function(item) { return item.assigned_to });
		var currentItem = ExplainTheWord_ExplainItems.findOne({ groupId: groupId, assigned_to: userId.toString(), classroomId: classroomId });
		var newItem = ensureUniqueItem(wordlistItems, explainItems, currentItem);
		var timestamp = new Date();

		if(currentItem)
		{
			ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { assigned_to: null } });
		}
		if(newItem)
		{
			var oldItem = ExplainTheWord_ExplainItems.findOne({ item: newItem.item, classroomId: newItem.classroomId, groupId: groupId, answered: false });
			if(oldItem)
			{
				timestamp = oldItem.assigned_timestamp ? oldItem.assigned_timestamp : timestamp;
				ExplainTheWord_ExplainItems.update(oldItem._id, { $set: { assigned_to: userId, assigned_timestamp: timestamp } });
			}
			else
			{
				ExplainTheWord_ExplainItems.insert({ item: newItem.item, classroomId: newItem.classroomId, groupId: groupId, assigned_to: userId, assigned_timestamp: timestamp, answered: false, answer: null });
			}
		}
	},
	unassignItem: function(userId, classroomId) {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ assigned_to: userId.toString(), classroomId: classroomId });

		if(currentItem)
		{
			ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { assigned_to: userId } });
		}
	}
});