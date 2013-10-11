Meteor.subscribe('activities');

Deps.autorun(function() {
	var $container = $('.classroom .container');

	if(Session.get('groupsVisible'))
	{
		if($container.hasClass('activity'))
		{
			$container.removeClass('activity');
		}
		$container.addClass('groups');
	}
	else
	{
		if($container.hasClass('groups'))
		{
			$container.removeClass('groups');
		}
		$container.addClass('activity');
	}
});

Template.classroom.rendered = function() {
	if(Meteor.user())
	{	
		var currentGroup = Groups.findOne({members: Meteor.user()._id});
		if(!currentGroup && Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') === -1)
		{
			Meteor.call('createGroup', this.data._id, Meteor.user()._id);
		}

		var leftButtonTemplate = Session.get('leftButton');
		var rightButtonTemplate = Session.get('rightButton');
		var forwardButtonTemplate = Session.get('forwardButton');

		console.log(rightButtonTemplate);

		if(!leftButtonTemplate || leftButtonTemplate === 'leftButton')
		{
			Session.set('leftButton', 'classroom_leftButton');
		}

		if(!rightButtonTemplate || rightButtonTemplate === 'rightButton')
		{
			Session.set('rightButton', 'classroom_rightButton');
		}
	}
}

Template.classroom.events({
	'click #btn-remove-user-from-room': function() {
		Session.set('leavingCurrentRoom', true);
		Session.set('currentRoom', null);
		Meteor.call('setUserCurrentRoom', Meteor.user()._id, null);
		Router.go('/');
	},
	'click .component-selector': function(event, template) {
		var classroom = template.data._id;
		var component = this.name;
		Meteor.call('setCurrentComponent', classroom, component);
	},
	'click .activity-leave': function(event, template) {
		Meteor.call('setCurrentActivity', template.data._id, 'idle');
	}
});

Template.classroom.helpers({
	activity: function() {
		var activity = Activities.findOne({name: this.currentActivity});
		if(!activity)
		{
			activity = Activities.findOne({name: 'idle'});
		}
		
		if(activity)
		{
			return Template[activity.template]({ activity: activity, classroom: this });
		}
	},
	currentActivity: function() {
		var activity = Activities.findOne({name: this.currentActivity});
		return activity;
	},
	components: function() {
		return Components.find();
	}
});