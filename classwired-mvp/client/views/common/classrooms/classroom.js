Meteor.subscribe('activities');

var setView = function(showGroupManager) {
	var $container = $('.classroom > .container');

	if(showGroupManager)
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
};

Deps.autorun(function() {
	var showGroupManager = Session.get('groupsVisible');

	setView(showGroupManager);
});

Template.classroom.rendered = function() {
	if(Meteor.user())
	{	
		var showGroupManager = Session.get('groupsVisible');
		var currentGroup = Groups.findOne({members: Meteor.user()._id});

		setView(showGroupManager);

		Session.set('currentClassroom', this.data._id)
		
		if(!currentGroup && Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') === -1)
		{
			Meteor.call('createGroup', this.data._id, Meteor.user()._id);
		}

		var leftButtonTemplate = Session.get('leftButton');
		var rightButtonTemplate = Session.get('rightButton');
		var forwardButtonTemplate = Session.get('forwardButton');

		if(Meteor.user().permissions && Meteor.user().permissions.indexOf('teacher') === -1)
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
		var activityInstance = ActivityInstances.findOne(CurrentClassroom.currentActivity.get());
		var activity = activityInstance ? Activities.findOne(activityInstance.activityId) : null;
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
	},
	classroomIsValid: function() {
		return !$.isEmptyObject(this);
	}
});