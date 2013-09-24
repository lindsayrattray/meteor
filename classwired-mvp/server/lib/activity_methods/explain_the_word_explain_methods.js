var ensureUniqueItem = function(wordlistItems, explainItems, currentItem)
{
	var result = currentItem ? Random.choice(_.reject(wordlistItems, function(wordlistItem) { return wordlistItem.item === currentItem.item })) : Random.choice(wordlistItems);

	if(_.findWhere(explainItems, { item: result.item }))
	{
		explainItems = _.reject(explainItems, function(explainItem){ return explainItem.item === result.item });
		if(explainItems.length > 0)
		{
			result = ensureUniqueItem(wordlistItems, explainItems, currentItem);
		}
	}
	return result;
}

Meteor.methods({
	assignNewItem: function(userId) {
		var wordlistItems = ExplainTheWord_WordlistItems.find().fetch();
		var explainItems = ExplainTheWord_ExplainItems.find().fetch();
		var currentItem = ExplainTheWord_ExplainItems.findOne({ userId: userId, current: true });
		var newItem = ensureUniqueItem(wordlistItems, explainItems, currentItem);
		var timestamp = new Date();

		if(currentItem)
		{
			ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { current: false } });
		}
		ExplainTheWord_ExplainItems.insert({ item: newItem.item, classroomId: newItem.classroomId, userId: userId, current: true, assigned_timestamp: timestamp, answered: false, answer: '' });
	},
	assignSpecificItem: function(userId, itemId) {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ userId: userId, current: true });
		var newItem = ExplainTheWord_WordlistItems.findOne(itemId);
		var timestamp = new Date();

		if(currentItem)
		{
			ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { current: false } });
		}
		ExplainTheWord_ExplainItems.insert({ item: newItem.item, classroomId: newItem.classroomId, userId: userId, current: true, assigned_timestamp: timestamp, answered: false, answer: '' });
	},
	assignNewItemToAllUsers: function(classroomId) {
		var groups = Groups.find({ classroomId: classroomId }).fetch();
		for(groupIndex in groups)
		{
			var members = groups[groupIndex].members;
			for(memberIndex in members)
			{
				Meteor.call('assignNewItem', members[memberIndex]);
			}
		}
	}
});