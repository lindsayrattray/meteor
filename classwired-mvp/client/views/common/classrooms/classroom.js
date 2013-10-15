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

		Session.set('currentClassroom', this.data._id)
		
		if(!currentGroup && Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') === -1)
		{
			Meteor.call('createGroup', this.data._id, Meteor.user()._id);
		}

		

		var leftButtonTemplate = Session.get('leftButton');
		var rightButtonTemplate = Session.get('rightButton');
		var forwardButtonTemplate = Session.get('forwardButton');

		if(Meteor.user().permissions.indexOf('teacher') === -1)
		{
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
}

Template.classroom.helpers({
	activity: function() {
		var activity = Activities.findOne(this.currentActivity);
		if(!activity)
		{
			return Template['activityManager']({ classroom: this });
		}
		
		if(activity)
		{
			return Template[activity.template]({ activity: activity, classroom: this });
		}
	},
	currentActivity: function() {
		var activity = Activities.findOne(this.currentActivity);
		return activity;
	}
});