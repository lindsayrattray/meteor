var updateWordlist = _.debounce(function(item, content) {
	ExplainTheWord_WordlistItems.update(item._id, { $set: { item: content } });
	Session.set('editingItem', false);
}, 1000, false);

Template.activityExplainTheWord_Wordlist_Student.rendered = function() {
	var isEditing = Session.get('editingItem')
	if(!isEditing)
	{
		var $wordlistContainer = $('.wordlist.student ul');
		$wordlistContainer.stop().animate({ scrollTop: $wordlistContainer.prop("scrollHeight") }, 1000);
	}
};

Template.activityExplainTheWord_Wordlist_Student.events({
	'input .wordlist.student ul li span input': function(event, template) {
		updateWordlist(this, event.target.value);
	},
	'focus .wordlist.student ul li span input': function() {
		Session.set('editingItem', true);
	},
	'blur .wordlist.student ul li span input': function() {
		Session.set('editingItem', false);
	},
	'submit .wordlist.student form': function(event, template) {
		var user = Meteor.user();
		if(user)
		{
			var group = Groups.findOne({ members: user._id, classroomId: template.data.classroom._id });
			var wordlistItem =  {
									item: template.find('.wordlist.student form input').value,
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
		template.find('.wordlist.student form input').value = '';

		event.preventDefault();
	}
});

Template.activityExplainTheWord_Wordlist_Student.helpers({
	wordlistItems: function() {
		return ExplainTheWord_WordlistItems.find({}, { sort: { created_timestamp: 1 } });
	}
});