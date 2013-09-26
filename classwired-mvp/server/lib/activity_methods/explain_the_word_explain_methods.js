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
		var explainItems = _.pluck(ExplainTheWord_ExplainItems.find({ classroomId: classroomId, userId: userId }).fetch(), 'item');
		var wordlistItems = _.chain(ExplainTheWord_WordlistItems.find({ classroomId: classroomId }).fetch()).pluck('item').uniq().difference(explainItems).value();

		//

		if(wordlistItems.length > 0)
		{
			for(itemIndex in wordlistItems)
			{
				ExplainTheWord_ExplainItems.insert({ item: wordlistItems[itemIndex], classroomId: classroomId, userId: userId, current: false, assigned_timestamp: null, answered: false, answer: null});
			}
		}
	},
	assignNewItem: function(userId, classroomId) {
		var wordlistItems = ExplainTheWord_WordlistItems.find({ classroomId: classroomId }).fetch();
		var explainItems = ExplainTheWord_ExplainItems.find({ userId: userId.toString(), answered: true, classroomId: classroomId }).fetch();
		var currentItem = ExplainTheWord_ExplainItems.findOne({ userId: userId.toString(), current: true, classroomId: classroomId });
		var newItem = ensureUniqueItem(wordlistItems, explainItems, currentItem);
		var timestamp = new Date();
		
		console.log(currentItem);

		if(currentItem)
		{
			console.log('switching current');
			console.log(currentItem);
			ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { current: false } });
		}
		if(newItem)
		{
			var oldItem = ExplainTheWord_ExplainItems.findOne({ item: newItem.item, classroomId: newItem.classroomId, userId: userId, answered: false });
			if(oldItem)
			{
				console.log('update');
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