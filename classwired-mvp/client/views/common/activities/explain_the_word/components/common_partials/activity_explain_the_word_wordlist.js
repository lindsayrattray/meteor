Template.activityExplainTheWord_Wordlist_Wordlist.rendered = function() {
	var focusedItems = $('*:focus').length
	if(focusedItems === 0)
	{
		var $wordlistContainer = $('#wordlist-container');
		$wordlistContainer.animate({ scrollTop: $wordlistContainer.prop("scrollHeight") }, 500);
	}
};

Template.activityExplainTheWord_Wordlist_Wordlist.events({
	
});

Template.activityExplainTheWord_Wordlist_Wordlist.helpers({
	wordlistItems: function() {
		return ExplainTheWord_WordlistItems.find();
	}
});