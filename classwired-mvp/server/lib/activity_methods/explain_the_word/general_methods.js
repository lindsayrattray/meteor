Meteor.methods({
	reassignGroupWords: function(activityInstanceId, classroomId) {
		var wordlistItems = ExplainTheWord_WordlistItems.find({ classroomId: classroomId, activityInstanceId: activityInstanceId }).fetch();
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
	explainTheWord_calculateItemTimes: function(activityInstanceId) {
		var explainItems = _.filter(ExplainTheWord_ExplainItems.find({ activityInstanceId: activityInstanceId }, { sort: { item: -1 } }).fetch(), function(item) { return item.answered_timestamp });
		var uniqueItems = _.chain(explainItems).pluck('item').uniq(true).value();

		for(index in uniqueItems)
		{
			var theseItems = _.filter(explainItems, function(item) { return item.item === uniqueItems[index] });
			var matchItem = ExplainTheWord_ExplainItemTimes.findOne({ activityInstanceId: activityInstanceId, item: uniqueItems[index] });

			var time = 0;

			for(thisIndex in theseItems)
			{
				time += theseItems[thisIndex].answered_timestamp - theseItems[thisIndex].assigned_timestamp;
			}

			time /= (theseItems.length | 1);

			if(matchItem)
			{
				ExplainTheWord_ExplainItemTimes.update(matchItem._id, { $set: { averageTime: time } });
			}
			else
			{
				ExplainTheWord_ExplainItemTimes.insert({ item: uniqueItems[index], activityInstanceId: activityInstanceId, averageTime: time });
			}
		}
	},
	explainTheWord_claculateGroupTimes: function(activityInstanceId) {
		var explainItems = _.filter(ExplainTheWord_ExplainItems.find({ activityInstanceId: activityInstanceId }, { sort: { groupId: -1 } }).fetch(), function(item) { return item.answered_timestamp });
		var uniqueItems = _.chain(explainItems).pluck('groupId').uniq(true).value();

		for(index in uniqueItems)
		{
			var theseItems = _.filter(explainItems, function(item) { return item.groupId === uniqueItems[index] });
			var matchItem = ExplainTheWord_ExplainGroupTimes.findOne({ activityInstanceId: activityInstanceId, groupId: uniqueItems[index] });

			var time = 0;

			for(thisIndex in theseItems)
			{
				time += theseItems[thisIndex].answered_timestamp - theseItems[thisIndex].assigned_timestamp;
			}

			time /= (theseItems.length | 1);

			if(matchItem)
			{
				ExplainTheWord_ExplainGroupTimes.update(matchItem._id, { $set: { averageTime: time } });
			}
			else
			{
				ExplainTheWord_ExplainItemTimes.insert({ groupId: uniqueItems[index], activityInstanceId: activityInstanceId, averageTime: time });
			}
		}
	},
	calculateTimes: function(items, activityInstanceId, classroomId) {
		for(itemIndex in items)
		{
			var explainItems = ExplainTheWord_ExplainItems.find({ item: items[itemIndex], classroomId: classroomId, activityInstanceId: activityInstanceId }).fetch();
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

			var matchItem = ExplainTheWord_ExplainItemTimes.findOne({ item: items[itemIndex], activityInstanceId: activityInstanceId, classroomId: classroomId }, { reactive: false });
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
				item.activityInstanceId = activityInstanceId;

				ExplainTheWord_ExplainItemTimes.insert(item);				
			}
		}
	}
});