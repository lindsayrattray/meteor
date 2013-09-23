var ensureUniqueItem = function(wordlistItems, explainItems)
{
	var result = _.sample(wordlistItems);
	explainItems = _.reject(explainItems, {item: result.item});
	if(explainItems.length > 0)
	{
		result = ensureUniqueItem(wordlistItems, explainItems);
	}
	return result;
}

Meteor.methods({
	assignNewItem: function(groupId) {
		var wordlistItems = ExplainTheWord_WordlistItems.find().fetch();
		var explainItems = ExplainTheWord_ExplainItems.find().fetch();
		var currentItem = ExplainTheWord_ExplainItems.findOne({ groupId: groupId, current: true });
		var newItem = ensureUniqueItem(wordlistItems, explainItems);
		var timestamp = new Date();

		if(currentItem)
		{
			ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { current: false } });
		}
		ExplainTheWord_ExplainItems.insert({ item: newItem.item, classroomId: newItem.classroomId, groupId: groupId, current: true, assigned_timestamp: timestamp, answered: false, answer: '' });
	},
	assignSpecificItem: function(groupId, itemId) {
		var currentItem = ExplainTheWord_ExplainItems.findOne({ groupId: groupId, current: true });
		var newItem = ExplainTheWord_WordlistItems.findOne(itemId);
		var timestamp = new Date();

		if(currentItem)
		{
			ExplainTheWord_ExplainItems.update(currentItem._id, { $set: { current: false } });
		}
		ExplainTheWord_ExplainItems.insert({ item: newItem.item, classroomId: newItem.classroomId, groupId: groupId, current: true, assigned_timestamp: timestamp, answered: false, answer: '' });
	},
	assignNewItemToAllGroups: function(classroomId) {
		var groups = Groups.find({ classroomId: classroomId }).fetch();
		for(group in groups)
		{
			Meteor.call('assignNewItem', groups[group]._id);
		}
	}
});