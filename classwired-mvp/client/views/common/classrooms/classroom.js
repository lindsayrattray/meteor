Meteor.subscribe('activities');

Template.classroom.rendered = function() {
	if(Meteor.user())
	{
		if(!Session.get('leavingCurrentRoom'))
		{
			Meteor.call('setUserCurrentRoom', Meteor.user()._id, this.data._id);
		}
	}

	Session.set('currentClassroom', this.data._id);
	
	var currentGroup = Groups.findOne({members: Meteor.user()._id});
	if(!currentGroup)
	{
		console.log(Meteor.user()._id);
		Meteor.call('createGroup', this.data._id, Meteor.user()._id);
	}
}

Template.classroom.events({
	'click #btn-remove-user-from-room': function() {
		Session.set('leavingCurrentRoom', true);
		Session.set('currentRoom', null);
		Meteor.call('setUserCurrentRoom', Meteor.user()._id, null);
		Router.go('/');
	},
	'click .btn-join-group': function(event, template) {
		var user = Meteor.user();
		var classroom = Session.get('currentClassroom');
		var targetId = this._id;
		var currentGroup = Groups.findOne({ classroomId: classroom, members: user._id });

		if(targetId !== currentGroup._id)
		{
			Meteor.call('mergeGroups', currentGroup._id, targetId);
		}
	},
	'click .btn-remove-user-from-group': function(event, template) {
		var user = Meteor.users.findOne(event.srcElement.dataset.member);
		var classroom = Session.get('currentClassroom');
		var group = Groups.findOne({ classroomId: classroom, members: user._id });
		Meteor.call('removeUserFromGroup', group._id, user._id);
	}
});

Template.classroom.helpers({
	activity: function() {
		var activity = Activities.findOne({name: this.currentActivity});
		if(!activity)
		{
			activity = Activities.findOne({name: 'idle'});
		}

		return Template[activity.template]({ activity: activity, classroom: this });
	},
	groups: function() {
		return Groups.find();	
	}
});