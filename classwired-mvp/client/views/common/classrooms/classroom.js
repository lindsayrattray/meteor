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
	Meteor.subscribe('groups', this.data._id, Meteor.user()._id);
}

Template.classroom.events({
	'click #btn-remove-user-from-room': function() {
		Session.set('leavingCurrentRoom', true);
		Meteor.call('setUserCurrentRoom', Meteor.user()._id, null);
		Router.go('/');
	}
});

Template.classroom.helpers({
	activity: function() {
		var activity = Activities.findOne({name: this.currentActivity});
		if(!activity)
		{
			activity = Activities.findOne({name: 'idle'});
		}

		var fragment = Meteor.render(function() {
			Template[activity.template];
		});

		return Template[activity.template]({ activity: activity, classroom: this });
	}
});