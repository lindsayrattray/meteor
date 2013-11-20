

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
	toggleModal(CurrentClassroom.uiState.get('showCreateModal'));
});

Template.classroomManager.rendered = function() {
	Session.set('leftButton', 'leftButton');
	Session.set('rightButton', 'rightButton');
	Session.set('forwardButton', false);
	Session.set('forwardMenu', null);
	Session.set('currentClassroom', null);
	
	toggleModal(CurrentClassroom.uiState.get('showCreateModal'));
};

Template.classroomManager.helpers({
	classrooms: function() {
		return Classrooms.find({}, { sort: { date_created: -1 } });
	}
});

Template.classroomManager.events({
	'click button.new': function(event, template) {
		var nameInput = template.find('#classroom-name');
		CurrentClassroom.uiState.set('showCreateModal', true);
		nameInput.focus();
	},
	'submit .modal form': function(event, template) {
		var nameInput = template.find('#classroom-name');
		var descriptionInput = template.find('#classroom-description')

		if(Classrooms.findOne({ name: nameInput.value }))
		{
			alert('Classroom with name: \"' + nameInput.value + '\" already exists!');
		}
		else
		{
			Meteor.call('createClassroom', nameInput.value, Meteor.user()._id, descriptionInput.value);
			nameInput.value = '';
			descriptionInput.value = '';
			CurrentClassroom.uiState.set('showCreateModal', false);
		}
		
		event.preventDefault();
	},
	'reset .modal form': function(event, template) {
		var nameInput = template.find('#classroom-name');
		nameInput.value = '';
		CurrentClassroom.uiState.set('showCreateModal', false);

		event.preventDefault();
	},
	'click .classroom-manager .classroom .join': function(event, template) {
		CurrentClassroom.set(this);
		Router.go('classroom', CurrentClassroom.get());
	}
});