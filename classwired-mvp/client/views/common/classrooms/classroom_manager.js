Template.classroomManager.rendered = function() {
	Session.set('leftButton', 'leftButton');
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
	'click #btn-add-classroom': function(event, template) {
		var $addClassroom = $('#add-classroom');
		var nameInput = template.find('#add-classroom-name');

		if($addClassroom.hasClass('slide-down-invisible'))
		{
			$addClassroom.removeClass('slide-down-invisible').addClass('slide-down-visible');
			nameInput.focus();
		}
		else if($addClassroom.hasClass('slide-down-visible'))
		{
			$addClassroom.removeClass('slide-down-visible').addClass('slide-down-invisible');
			nameInput.value = '';
		}
	},
	'submit #add-classroom': function(event, template) {
		var nameInput = template.find('#add-classroom-name')
		Meteor.call('createClassroom', nameInput.value, Meteor.user()._id);
		nameInput.value = '';

		event.preventDefault();
	},
	'click .classroom-list li a': function(event, template) {
		var destination = Classrooms.findOne(this._id);
		Session.set('leavingCurrentRoom', false);
		Meteor.call('setUserCurrentRoom', Meteor.user()._id, this._id);
		Router.go('classroom', destination);
	}
});