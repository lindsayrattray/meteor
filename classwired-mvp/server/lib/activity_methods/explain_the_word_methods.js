Meteor.methods({
	reassignGroupWords: function(classroomId) {
		var wordlistItems = ExplainTheWord_WordlistItems.find({ classroomId: classroomId }).fetch();
		var explainItems = ExplainTheWord_ExplainItems.find({ classroomId: classroomId }).fetch();
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
	},
	calculateTimes: function(items, classroomId) {
		for(itemIndex in items)
		{
			var explainedItems = _.filter(ExplainTheWord_ExplainItems.find({ item: items[itemIndex], classroomId: classroomId }).fetch(), function(item) { return item.answered_timestamp });
			var fastestItem = _.chain(ExplainTheWord_ExplainItems.find({ item: items[itemIndex], classroomId: classroomId }).fetch()).min(function(item) { return (Date.parse(item.answered_timestamp) - Date.parse(item.assigned_timestamp)) }).value();
			var fastestTime = (Date.parse(fastestItem.answered_timestamp) - Date.parse(fastestItem.assigned_timestamp)) / 1000;
			var fastestGroup = GroupHandler.getGroupByMember(fastestItem.userId, fastestItem.classroomId)
			var timeAcc = 0;

			if(explainedItems.length > 0)
			{
				for(explainedItemIndex in explainedItems)
				{
					if(explainedItems[explainedItemIndex].answered_timestamp)
					{
						timeAcc += (Date.parse(explainedItems[explainedItemIndex].answered_timestamp) - Date.parse(explainedItems[explainedItemIndex].assigned_timestamp));
					}
				}
			}

			var avg = timeAcc / (explainedItems.length * 1000);

			avg = (isNaN(avg) ? 0 : avg).toFixed(2);
			fastestTime = (isNaN(fastestTime) ? 0 : fastestTime);

			var matchItem = ExplainTheWord_ExplainItemTimes.findOne({ item: items[itemIndex], classroomId: classroomId }, { reactive: false });
			if(matchItem)
			{
				ExplainTheWord_ExplainItemTimes.update(matchItem._id, { $set: { avgTime: avg, fastestTime: fastestTime, fastestUser: fastestItem.userId, fastestGroup: fastestGroup._id } });
			}
			else
			{
				ExplainTheWord_ExplainItemTimes.insert({ item: items[itemIndex], avgTime: avg, fastestTime: fastestTime, fastestUser: fastestItem.userId, fastestGroup: fastestGroup._id, classroomId: classroomId });
			}
		}
	}
});