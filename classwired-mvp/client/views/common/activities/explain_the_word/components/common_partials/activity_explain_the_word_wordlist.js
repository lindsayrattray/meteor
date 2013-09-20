Template.activityExplainTheWord_Wordlist_Wordlist.rendered = function() {
	console.log('wordlist updated');
};

Template.activityExplainTheWord_Wordlist_Wordlist.helpers({
	wordlistItems: function() {
		return ExplainTheWord_WordlistItems.find();
	}
});