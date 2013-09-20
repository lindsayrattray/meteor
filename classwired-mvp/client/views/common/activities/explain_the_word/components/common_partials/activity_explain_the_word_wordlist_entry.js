Template.activityExplainTheWord_Wordlist_Entry.events({
	'click #btn-add-wordlist-item': function(event, template) {
		var user = Meteor.user()
		if(user)
		{
			var group = Groups.findOne({ members: user._id, classroomId: template.data.classroom._id });
			var wordlistItem =  {
									item: '',
									userId: user._id,
									groupId: group._id,
									classroomId: template.data.classroom._id
								};
			if(!ExplainTheWord_WordlistItems.findOne(wordlistItem))
			{
				ExplainTheWord_WordlistItems.insert(wordlistItem);	
			}
		}
	}
});

Template.activityExplainTheWord_Wordlist_Entry.helpers({

});