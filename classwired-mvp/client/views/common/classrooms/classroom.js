Template.classroom.rendered = function() {
	if(Meteor.user())
	{
		if(!Session.get('clearCurrentRoom'))
		{
			Meteor.call('setUserCurrentRoom', Meteor.user()._id, this.data._id);
		}

		Meteor.call('addParticipantToClassroom', this.data._id, Meteor.user()._id);
	}
}

Template.classroom.events({
	'click #btn-remove-user-from-room': function() {
		Session.set('clearCurrentRoom', true);
		Meteor.call('setUserCurrentRoom', Meteor.user()._id, null);
		Router.go('/');
	}
});