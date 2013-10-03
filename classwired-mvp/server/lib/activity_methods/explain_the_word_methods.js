Meteor.methods({
	reassignGroupWords: function(classroomId) {
		var wordlistItems = ExplainTheWord_WordlistItems.find({ classroomId: classroomId }).fetch();
		var explainItems = ExplainTheWord_ExplainItems.find({ classroomId: classroomId }).fetch();
		var user, group;

		for(itemIndex in wordlistItems)
		{
			user = wordlistItems[itemIndex].userId;
			group = GroupManager.getGroupByMember(user, classroomId);

			if(group)
			{
				ExplainTheWord_WordlistItems.update(wordlistItems[itemIndex]._id, { $set: { groupId: group._id } });
			}
		}

		for(itemIndex in explainItems)
		{
			user = explainItems[itemIndex].userId;
			group = GroupManager.getGroupByMember(user, classroomId);

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
			var fastestItem = _.chain(ExplainTheWord_ExplainItems.find({ item: items[itemIndex], classroomId: classroomId }).fetch()).min(function(item) {
				var result = Date.parse(item.answered_timestamp) - Date.parse(item.assigned_timestamp);
				result = _.isNaN(result) ? Infinity : result;
				return result;
			}).value();

			var fastestTime, fastestGroup;

			if(fastestItem && fastestItem !== Infinity)
			{
				fastestTime = (Date.parse(fastestItem.answered_timestamp) - Date.parse(fastestItem.assigned_timestamp)) / 1000;
				fastestGroup = GroupManager.getGroupByMember(fastestItem.userId, fastestItem.classroomId)
			}
			
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
			var item = { avgTime: avg };

			if(fastestGroup)
			{
				item.fastestTime = fastestTime;
				item.fastestUser = fastestItem.userId;
				item.fastestGroup = fastestGroup._id;
			}

			if(matchItem)
			{
				ExplainTheWord_ExplainItemTimes.update(matchItem._id, { $set: item });
			}
			else
			{
				item.item = items[itemIndex];
				item.classroomId = classroomId;

				ExplainTheWord_ExplainItemTimes.insert(item);				
			}
		}
	}
});