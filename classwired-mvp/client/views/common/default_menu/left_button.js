Template.leftButton.helpers({
	buttonText: function() {
		return Session.get('groupsVisible') ? 'Activity' : 'Groups';
	}
});

Template.leftButton.events({
	'click button.left': function() {
		var showGroups = Session.get('groupsVisible') ? false : true;
		Session.set('groupsVisible', showGroups);
	}
});