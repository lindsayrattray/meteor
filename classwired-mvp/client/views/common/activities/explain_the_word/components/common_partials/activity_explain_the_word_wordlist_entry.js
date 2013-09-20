Template.activityExplainTheWord_Wordlist_Entry.events({
	'click #btn-add-wordlist-item': function(event, template) {
		var user = Meteor.user()
		if(user)
		{
			var group = Groups.findOne({ members: user._id, classroomId: template.data.classroom._id });
			ExplainTheWord_WordlistItems.insert({ item: '', userId: user._id, groupId: group._id, classroomId: template.data.classroom._id });
		}
	}
});

Template.activityExplainTheWord_Wordlist_Entry.helpers({

});