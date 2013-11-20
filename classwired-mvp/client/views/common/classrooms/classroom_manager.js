var onCreateClassroom = function(result, error) {
	if(result.success)
	{
		$('#classroom-name').val('');
		$('#classroom-description').val('');
		CurrentClassroom.uiState.set('showCreateModal', false);
	}
	else
	{
		alert(error.text);
	}
}

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
		var nameInput = template.find('#txt-classroom-name');
		CurrentClassroom.uiState.set('showCreateModal', true);
		nameInput.focus();
	},
	'submit .modal form': function(event, template) {
		var options = {};
		options.name = template.find('#txt-classroom-name').value;
		options.userManager = CurrentUser;
		options.description = template.find('#txt-classroom-description').value;

		CurrentClassroom.setOnCreate(function(error, result) {
			onCreateClassroom(error, result);
		});
		CurrentClassroom.createClassroom(options);

		event.preventDefault();
	},
	'reset .modal form': function(event, template) {
		template.find('#txt-classroom-name').value = '';
		CurrentClassroom.uiState.set('showCreateModal', false);

		event.preventDefault();
	},
	'click .classroom-manager .classroom .join': function(event, template) {
		CurrentClassroom.set(this);
		Router.go('classroom', CurrentClassroom.get());
	}
});