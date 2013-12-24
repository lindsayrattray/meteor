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

			time /= (theseItems.length | 1) * 1000;
			time = time.toFixed(2);

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
	explainTheWord_calculateGroupTimes: function(activityInstanceId) {
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

			time /= (theseItems.length | 1) * 1000;
			time = time.toFixed(2);

			if(matchItem)
			{
				ExplainTheWord_ExplainGroupTimes.update(matchItem._id, { $set: { averageTime: time } });
			}
			else
			{
				ExplainTheWord_ExplainGroupTimes.insert({ groupId: uniqueItems[index], activityInstanceId: activityInstanceId, averageTime: time });
			}
		}
	}
});