Template.activityPeerCorrection_Wordlist_Stats.helpers({
	groups: function() {
		return Groups.find();
	},
	groupWordCount: function(groupId) {
		var wordlistItems = PeerCorrection_WordlistItems.find({ groupId: groupId }).fetch();
		return wordlistItems.length;
	}
})