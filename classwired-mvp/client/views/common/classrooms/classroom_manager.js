Template.classroomManager.rendered = function() {
	Session.set('leftButton', 'leftButton');
	Session.set('rightButton', 'rightButton');
	Session.set('forwardButton', false);
	Session.set('forwardMenu', null);
};

Template.classroomManager.helpers({
	classrooms: function() {
		return Classrooms.find({}, { sort: { date_created: -1 } });
	},
	ownerName: function(classroom) {
		return Meteor.users.findOne(classroom.owner).profile.name;
	}
});

Template.classroomManager.events({
	'click .classroom-manager .container button': function(event, template) {
		var $modal = $(template.find('.modal'));
		var nameInput = template.find('.modal div form input');
		$modal.removeClass('hide');
		nameInput.focus();
	},
	'submit .modal div form': function(event, template) {
		var nameInput = template.find('.modal div form input');
		var $modal = $(template.find('.modal'));
		Meteor.call('createClassroom', nameInput.value, Meteor.user()._id);
		nameInput.value = '';
		$modal.addClass('hide');

		event.preventDefault();
	},
	'cancel .modal div form': function(event, template) {
		var nameInput = template.find('.modal div form input');
		var $modal = $(template.find('.modal'));
		nameInput.value = '';
		$modal.addClass('hide');

		event.preventDefault();
	},
	'click .classroom-manager .container ul li a': function(event, template) {
		var destination = Classrooms.findOne(this._id);
		Session.set('leavingCurrentRoom', false);
		Meteor.call('setUserCurrentRoom', Meteor.user()._id, this._id);
		Router.go('classroom', destination);
	}
});