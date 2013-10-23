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
	},
	calculateTimes: function(items, classroomId) {
		for(itemIndex in items)
		{
			var explainItems = ExplainTheWord_ExplainItems.find({ item: items[itemIndex], classroomId: classroomId }).fetch();
			var explainedItems = _.filter(explainItems, function(item) { return item.answered_timestamp });
			var fastestItem = _.chain(explainItems).min(function(item) {
				var result = Date.parse(item.answered_timestamp) - Date.parse(item.assigned_timestamp);
				result = _.isNaN(result) ? Infinity : result;
				return result;
			}).value();
			var slowestItem = _.chain(explainItems).max(function(item) {
				var result = Date.parse(item.answered_timestamp) - Date.parse(item.assigned_timestamp);
				result = _.isNaN(result) ? -Infinity : result;
				return result;
			}).value();

			var fastestTime = null;
			var slowestTime = null;

			if(fastestItem && fastestItem !== Infinity)
			{
				fastestTime = (Date.parse(fastestItem.answered_timestamp) - Date.parse(fastestItem.assigned_timestamp)) / 1000;
			}

			if(slowestItem && slowestItem !== -Infinity)
			{
				slowestTime = (Date.parse(fastestItem.answered_timestamp) - Date.parse(fastestItem.assigned_timestamp)) / 1000;
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

			if(fastestTime)
			{
				item.fastestTime = fastestTime;
				item.fastestUser = fastestItem.answered_by;
				item.fastestGroup = fastestItem.groupId;
			}

			if(slowestTime && fastestTime && slowestTime !== fastestTime)
			{
				item.slowestTime = slowestTime;
				item.slowestUser = slowestItem.answered_by;
				item.slowestGroup = slowestItem.groupId;
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