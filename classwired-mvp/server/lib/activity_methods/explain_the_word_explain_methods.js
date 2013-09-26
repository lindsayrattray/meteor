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
		var possibleItems = _.chain(wordlistItems).pluck('item').uniq().difference(explained).without(currentItem).value();
		var resultItem = _.chain(possibleItems).shuffle().first().value();

		var result = _.findWhere(wordlistItems, { item: resultItem });
		return result;
	}
}

Meteor.methods({
	populateItems: function(userId, classroomId) {
		var wordlistItems = ExplainTheWord_WordlistItems.find({ classroomId: classroomId }).fetch();

		for(itemIndex in wordlistItems)
		{
			ExplainTheWord_ExplainItems.insert({ item: wordlistItems[itemIndex].item, classroomId: classroomId, userId: userId, current: false, assigned_timestamp: null, answered: false, answer: null});
		}
	},
	assignNewItem: function(userId, classroomId) {
		var wordlistItems = ExplainTheWord_WordlistItems.find({ classroomId: classroomId }).fetch();
		var explainItems = ExplainTheWord_ExplainItems.find({ userId: userId, answered: true, classroomId: classroomId }).fetch();
		var currentItem = _.findWhere(explainItems, { current: true });
		var newItem = ensureUniqueItem(wordlistItems, explainItems, currentItem);
		var timestamp = new Date();
		
		if(currentItem)
		{
			ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { current: false } });
		}
		if(newItem)
		{
			var oldItem = ExplainTheWord_ExplainItems.findOne({ item: newItem.item, classroomId: newItem.classroomId, userId: userId, answered: false });
			if(oldItem)
			{
				ExplainTheWord_ExplainItems.update(oldItem._id, { $set: { current: true } });
			}
			else
			{
				ExplainTheWord_ExplainItems.insert({ item: newItem.item, classroomId: newItem.classroomId, userId: userId, current: true, assigned_timestamp: timestamp, answered: false, answer: null });
			}
		}
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