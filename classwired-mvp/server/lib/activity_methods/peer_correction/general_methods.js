//TODO switch calculation methods over to _.countBy

Meteor.methods({
	peerCorrection_reassignGroupWords: function(activityInstanceId, classroomId) {
		var wordlistItems = PeerCorrection_WordlistItems.find({ classroomId: classroomId, activityInstanceId: activityInstanceId }).fetch();
		var user, group;

		for(itemIndex in wordlistItems)
		{
			user = wordlistItems[itemIndex].userId;
			group = GroupManager.getGroupByMember(user, classroomId);

			if(group)
			{
				PeerCorrection_WordlistItems.update(wordlistItems[itemIndex]._id, { $set: { groupId: group._id } });
			}
		}
	},
	peerCorrection_calculateItemAverages: function(activityInstanceId) {
		var items = PeerCorrection_CorrectionItems.find({ activityInstanceId: activityInstanceId }, { sort: { item: -1 } }).fetch();
		var uniqueItems = _.chain(items).pluck('item').uniq(true).value();

		var statsTuple = { correct: 0, incorrect: 0 }

		for(index in uniqueItems)
		{
			var theseItems = _.filter(items, function(item) { return item.item === uniqueItems[index]; });
			var matchItem = PeerCorrection_CorrectionItemStats.findOne({ activityInstanceId: activityInstanceId, item: uniqueItems[index]});
			
			statsTuple.correct = 0;
			statsTuple.incorrect = 0;

			for(thisIndex in theseItems)
			{
				if(theseItems[thisIndex].answer === true)
				{
					statsTuple.correct += 1;
				}
				else if(theseItems[thisIndex.answer === false])
				{
					statsTuple.incorrect += 1;
				}
			}

			if(matchItem)
			{
				PeerCorrection_CorrectionItemStats.update(matchItem._id, { $set: { correct: statsTuple.correct, incorrect: statsTuple.incorrect } });
			}
			else
			{
				PeerCorrection_CorrectionItemStats.insert({ item: uniqueItems[index], activityInstanceId: activityInstanceId, correct: statsTuple.correct, incorrect: statsTuple.incorrect });
			}
		}
	},
	peerCorrection_calculateUserAverages: function(activityInstanceId) {
		var items = PeerCorrection_CorrectionItems.find({ activityInstanceId: activityInstanceId }, { sort: { userId: -1 } }).fetch();
		var uniqueItems = _.chain(items).pluck('userId').uniq(true).value();
		
		for(index in uniqueItems)
		{
			var theseItems = _.filter(items, function(item) { return item.userId === uniqueItems[index]; });
			var matchItem = PeerCorrection_CorrectionUserStats.findOne({ activityInstanceId: activityInstanceId, userId: uniqueItems[index]});
			
			var statsTuple = {
				correct: 0,
				incorrect: 0
			};

			for(thisIndex in theseItems)
			{
				if(theseItems[thisIndex].answer === true)
				{
					statsTuple.correct += 1;
				}
				else if(theseItems[thisIndex.answer === false])
				{
					statsTuple.incorrect += 1;
				}
			}

			if(matchItem)
			{
				PeerCorrection_CorrectionUserStats.update(matchItem._id, { $set: { correct: statsTuple.correct, incorrect: statsTuple.incorrect } });
			}
			else
			{
				PeerCorrection_CorrectionUserStats.insert({ userId: uniqueItems[index], activityInstanceId: activityInstanceId, correct: statsTuple.correct, incorrect: statsTuple.incorrect });
			}
		}
	}
});