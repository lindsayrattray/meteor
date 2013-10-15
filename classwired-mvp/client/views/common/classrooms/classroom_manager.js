Deps.autorun(function() {
	var showModal = Session.get('classroomManager_ModalVisible');
	var $modal = $('.modal');

	if(showModal)
	{
		$modal.removeClass('hide');
	}
	else
	{
		$modal.addClass('hide');
	}
});

Template.classroomManager.rendered = function() {
	Session.set('leftButton', 'leftButton');
	Session.set('rightButton', 'rightButton');
	Session.set('forwardButton', false);
	Session.set('forwardMenu', null);

	var showModal = Session.get('classroomManager_ModalVisible');
	var $modal = $('.modal');

	if(showModal)
	{
		$modal.removeClass('hide');
	}
	else
	{
		$modal.addClass('hide');
	}
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
		var nameInput = template.find('.modal div form input');
		Session.set('classroomManager_ModalVisible', true);
		nameInput.focus();
	},
	'submit .modal div form': function(event, template) {
		var nameInput = template.find('.modal div form input');

		if(Classrooms.findOne({ name: nameInput.value }))
		{
			alert('Classroom with name: \"' + nameInput.value + '\" already exists!');
		}
		else
		{
			Meteor.call('createClassroom', nameInput.value, Meteor.user()._id);
			nameInput.value = '';
			Session.set('classroomManager_ModalVisible', false);
		}
		
		event.preventDefault();
	},
	'reset .modal div form': function(event, template) {
		var nameInput = template.find('.modal div form input');
		nameInput.value = '';
		Session.set('classroomManager_ModalVisible', false);

		event.preventDefault();
	},
	'click .classroom-manager .container ul li a': function(event, template) {
		var destination = Classrooms.findOne(this._id);
		Session.set('leavingCurrentRoom', false);
		Meteor.call('setUserCurrentRoom', Meteor.user()._id, this._id);
		Router.go('classroom', destination);
	}
});