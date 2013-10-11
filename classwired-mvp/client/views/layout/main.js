Template.main.rendered = function() {
	$(document).foundation();
}

Deps.autorun(function() {
	var user = Meteor.user();

	if(user)
	{
		var classroomId = Session.get('currentClassroom');
		var classroom = Classrooms.findOne(classroomId);
		Meteor.subscribe('groups', user._id, classroomId);
		if(classroom)
		{
			var currentActivity = Activities.findOne({ name: classroom.currentActivity });
			Meteor.subscribe('classroomGroups', classroomId);
			
			if(currentActivity)
			{
				Meteor.subscribe('components', currentActivity._id);
			}
		}
	}
});

Template.main.events({
	'click .top-menu .icon': function() {
		var main_MenuVisible = Session.get('main_MenuVisible') ? false : true;
		Session.set('main_MenuVisible', main_MenuVisible);
	},
	'click .top-menu .forward': function() {
		var forward_MenuVisible = Session.get('forward_MenuVisible') ? false : true;
		Session.set('forward_MenuVisible', forward_MenuVisible);
	},
	'click': function(event, template) {
		if(!$(event.srcElement).parents().filter('.top-menu .dropdown')[0] && !$(event.srcElement).hasClass('icon'))
		{
			Session.set('main_MenuVisible', false);
		}

		if(!$(event.srcElement).parents().filter('.top-menu .drodown')[0] && !$(event.srcElement).hasClass('forward'))
		{
			Session.set('forward_MenuVisible', false);
		}
	}
});

Template.main.helpers({
	leftButton: function() {
		var leftButtonTemplate = Session.get('leftButton') || 'leftButton';

		return Template[leftButtonTemplate]();
	},
	rightButton: function() {
		var rightButtonTemplate = Session.get('rightButton') || 'rightButton';

		return Template[rightButtonTemplate]();
	}
});