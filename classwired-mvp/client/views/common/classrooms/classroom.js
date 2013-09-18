Meteor.subscribe('activities');

Template.classroom.rendered = function() {
	if(Meteor.user())
	{
		if(!Session.get('leavingCurrentRoom'))
		{
			Meteor.call('setUserCurrentRoom', Meteor.user()._id, this.data._id);
		}

		Meteor.call('addParticipantToClassroom', this.data._id, Meteor.user()._id);
	}
}

Template.classroom.events({
	'click #btn-remove-user-from-room': function() {
		Session.set('leavingCurrentRoom', true);
		Meteor.call('setUserCurrentRoom', Meteor.user()._id, null);
		Router.go('/');
	}
});

Template.classroom.helpers({
	activityName: function(name) {
		console.log(name);
		console.log(Activities.findOne({name: name}));
	}
});