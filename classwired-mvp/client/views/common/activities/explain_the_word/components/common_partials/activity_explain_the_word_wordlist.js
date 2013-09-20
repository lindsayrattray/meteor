var updateWordlist = _.debounce(function(item, content) {
	ExplainTheWord_WordlistItems.update(item._id, { $set: { item: content } });
	Session.set('editingItem', false);
}, 1000, false);

Template.activityExplainTheWord_Wordlist_Wordlist.rendered = function() {
	var isEditing = Session.get('editingItem')
	if(!isEditing)
	{
		var $wordlistContainer = $('#wordlist-container');
		$wordlistContainer.animate({ scrollTop: $wordlistContainer.prop("scrollHeight") }, 500);
	}
};

Template.activityExplainTheWord_Wordlist_Wordlist.events({
	'input .txt-wordlist-item-input': function(event, template) {
		updateWordlist(this, event.srcElement.value);
	},
	'focus .txt-wordlist-item-input': function() {
		Session.set('editingItem', true);
	}
});

Template.activityExplainTheWord_Wordlist_Wordlist.helpers({
	wordlistItems: function() {
		return ExplainTheWord_WordlistItems.find();
	}
});