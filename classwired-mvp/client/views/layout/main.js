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
			Meteor.subscribe('classroomGroups', classroomId);
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
	'click .main .dropdown li .home': function () {
		var destination = Router.url('classroomManager');
		window.location = destination; // Using iron router causes wierd behavior, so doing it natively
		Session.set('main_MenuVisible', false);
	},
	'click': function(event, template) {
		if(!$(event.srcElement).parents().filter('.dropdown')[0] && !$(event.srcElement).hasClass('icon'))
		{
			Session.set('main_MenuVisible', false);
		}

		if(!$(event.srcElement).parents().filter('.dropdown')[0] && !$(event.srcElement).hasClass('forward'))
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
	},
	forwardMenu: function() {
		var forwardMenuTemplate = Session.get('forwardMenu');

		if(forwardMenuTemplate)
		{
			return Template[forwardMenuTemplate]();
		}
	},
	loggingIn: function() {
		return Meteor.loggingIn();
	},
	context: function() {
		var context = Session.get('currentContext') || 'context';

		return Template[context]();
	}
});