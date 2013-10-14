Template.activityExplainTheWord_Wordlist_Stats.helpers({
	groups: function() {
		return Groups.find();
	},
	groupWordCount: function(groupId) {
		var wordlistItems = ExplainTheWord_WordlistItems.find().fetch();
		wordlistItems = _.where(wordlistItems, { groupId: groupId });
		return wordlistItems.length;
	}
});