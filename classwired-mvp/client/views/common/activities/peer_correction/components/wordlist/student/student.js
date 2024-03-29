var updateWordlist = _.debounce(function(item, content) {
	PeerCorrection_WordlistItems.update(item._id, { $set: { item: content } });
	Session.set('editingItem', false);
}, 1000, false);

Deps.autorun(function() {
	var result = PeerCorrection_WordlistItems.find({}, { sort: { created_timestamp: 1 } }).fetch();
});

Template.activityPeerCorrection_Wordlist_Student.rendered = function() {
	var isEditing = Session.get('editingItem');
	if(!isEditing)
	{
		var $wordlistContainer = $('.wordlist.student ul');
		$wordlistContainer.stop().animate({ scrollTop: $wordlistContainer.prop("scrollHeight") }, 1000);
	}
};

Template.activityPeerCorrection_Wordlist_Student.events({
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
		var userId = Meteor.userId();
		if(userId && template.find('.wordlist.student #wordlist-entry').value !== '')
		{
			var group = Groups.findOne({ members: userId });
			var wordlistItem =  {
									item: template.find('.wordlist.student #wordlist-entry').value,
									userId: userId,
									groupId: group._id,
									activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id']),
									classroomId: CurrentClassroom.getValue(['_id'])
								};
			if(!PeerCorrection_WordlistItems.findOne(wordlistItem))
			{
				//TODO this needs to be moved server side so we have a canonical date
				wordlistItem.created_timestamp = Date.parse(new Date());
				PeerCorrection_WordlistItems.insert(wordlistItem);
			}
		}
		template.find('.wordlist.student #wordlist-entry').value = '';

		event.preventDefault();
	}
});

Template.activityPeerCorrection_Wordlist_Student.helpers({
	wordlistItems: function() {
		return PeerCorrection_WordlistItems.find({}, { sort: { created_timestamp: 1 } });
	}
});