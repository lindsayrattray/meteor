Template.activityExplainTheWord_Wordlist_Entry.events({
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

		event.preventDefault();
	}
});

Template.activityExplainTheWord_Wordlist_Entry.helpers({

});