var toggleModal = function(showModal) {
	var $modal = $('.modal');

	if(showModal)
	{
		$modal.removeClass('hide');
	}
	else
	{
		$modal.addClass('hide');
	}
}

Deps.autorun(function() {
	var showModal = Session.get('classroomManager_ModalVisible');
	
	toggleModal(showModal);
});

Template.classroomManager.rendered = function() {
	Session.set('leftButton', 'leftButton');
	Session.set('rightButton', 'rightButton');
	Session.set('forwardButton', false);
	Session.set('forwardMenu', null);
	Session.set('currentClassroom', null);

	var showModal = Session.get('classroomManager_ModalVisible');
	
	toggleModal(showModal);
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
	'click button.new': function(event, template) {
		var nameInput = template.find('.modal div form input');
		Session.set('classroomManager_ModalVisible', true);
		nameInput.focus();
	},
	'submit .modal form': function(event, template) {
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
	'reset .modal form': function(event, template) {
		var nameInput = template.find('.modal div form input');
		nameInput.value = '';
		Session.set('classroomManager_ModalVisible', false);

		event.preventDefault();
	},
	'click .classroom-manager .classroom .join': function(event, template) {
		var destination = Classrooms.findOne(this._id);
		Session.set('leavingCurrentRoom', false);
		Meteor.call('setUserCurrentRoom', Meteor.user()._id, this._id);
		Router.go('classroom', destination);
	}
});