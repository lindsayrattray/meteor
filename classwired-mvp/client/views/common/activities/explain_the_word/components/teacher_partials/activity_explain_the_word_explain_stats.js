Meteor.subscribe('explainTheWord_ExplainItemTimes')

Deps.autorun(function() {
	var items = _.chain(ExplainTheWord_ExplainItems.find({}, { sort: { item: -1 } }).fetch()).pluck('item').uniq(true).value();
	for(itemIndex in items)
	{
		var explainedItems = _.filter(ExplainTheWord_ExplainItems.find({ item: items[itemIndex] }).fetch(), function(item) { return item.answered_timestamp });
		var fastestItem = _.chain(ExplainTheWord_ExplainItems.find({ item: items[itemIndex] }).fetch()).sortBy(function(item) { return (Date.parse(item.answered_timestamp) - Date.parse(item.assigned_timestamp)) }).first().value();
		var fastestTime = ((Date.parse(fastestItem.answered_timestamp) - Date.parse(fastestItem.assigned_timestamp)) / 1000).toFixed(2);
		var timeAcc = 0;

		console.log(explainedItems);
		console.log(fastestTime);

		if(explainedItems.length > 0)
		{
			for(explainedItemIndex in explainedItems)
			{
				if(explainedItems[explainedItemIndex].answered_timestamp)
				{
					console.log(timeAcc);
					timeAcc += (Date.parse(explainedItems[explainedItemIndex].answered_timestamp) - Date.parse(explainedItems[explainedItemIndex].assigned_timestamp));
				}
			}
		}

		var avg = (timeAcc / (explainedItems.length * 1000)).toFixed(2);

		var matchItem = ExplainTheWord_ExplainItemTimes.findOne({ item: items[itemIndex] }, { reactive: false });
		if(matchItem)
		{
			ExplainTheWord_ExplainItemTimes.update(matchItem._id, { $set: { avgTime: avg, fastestTime: fastestTime, fastestUser: fastestItem.userId } });
		}
		else
		{
			ExplainTheWord_ExplainItemTimes.insert({ item: items[itemIndex], avgTime: avg, fastestTime: fastestTime, fastestUser: fastestItem.userId });
		}
	}
});

Template.activityExplainTheWord_Explain_Stats.rendered = function() {
	
};

Template.activityExplainTheWord_Explain_Stats.helpers({
	explainItems: function() {
		var explainItems = ExplainTheWord_ExplainItemTimes.find().fetch().sort(function(a, b) { return b.avgTime - a.avgTime });
		return explainItems;
	}
});