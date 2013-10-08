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
	},
	'submit #add-wordlist-item': function(event, template) {
		var user = Meteor.user();
		if(user)
		{
			var group = Groups.findOne({ members: user._id, classroomId: template.data.classroom._id });
			var wordlistItem =  {
									item: template.find('#txt-add-wordlist-item').value,
									userId: user._id,
									groupId: group._id,
									classroomId: template.data.classroom._id
								};
			if(!ExplainTheWord_WordlistItems.findOne(wordlistItem))
			{
				wordlistItem.created_timestamp = Date.parse(new Date());
				ExplainTheWord_WordlistItems.insert(wordlistItem);
			}
		}
		template.find('#txt-add-wordlist-item').value = '';

		event.preventDefault();
	}
});

Template.activityExplainTheWord_Wordlist_Wordlist.helpers({
	wordlistItems: function() {
		return ExplainTheWord_WordlistItems.find({}, { sort: { created_timestamp: 1 } });
	}
});