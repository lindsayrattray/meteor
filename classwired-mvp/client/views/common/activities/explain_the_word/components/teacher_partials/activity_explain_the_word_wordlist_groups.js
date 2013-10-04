Template.activityExplainTheWord_Wordlist_Groups.rendered = function() {
	
};

Template.activityExplainTheWord_Wordlist_Groups.helpers({
	groups: function() {
		return Groups.find();
	},
	groupWordCount: function(groupId) {
		var wordlistItems = ExplainTheWord_WordlistItems.find().fetch();
		wordlistItems = _.where(wordlistItems, { groupId: groupId });
		return wordlistItems.length;
	}
});