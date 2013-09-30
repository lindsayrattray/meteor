Template.classroomManager.rendered = function() {
	if(Meteor.user() && Meteor.user().currentRoom && !Session.get('leavingCurrentRoom'))
	{
		var userCurrentClassroom = Classrooms.findOne(Meteor.user().currentRoom);
		if(userCurrentClassroom.open)
		{
			Router.go('classroom', userCurrentClassroom)
		}

		$('#add-classroom-container').css('height', $('#add-classroom-container').height());
		$('#add-classroom div').each(function() {
			$(this).css('height', $(this).height());
		});
	}
}

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
		var $addClassroomContainer = $('#add-classroom-container');
		var nameInput = template.find('#add-classroom-name');

		if($addClassroomContainer.hasClass('slide-down-invisible'))
		{
			$addClassroomContainer.removeClass('slide-down-invisible').addClass('slide-down-visible');
			nameInput.focus();
		}
		else if($addClassroomContainer.hasClass('slide-down-visible'))
		{
			$addClassroomContainer.removeClass('slide-down-visible').addClass('slide-down-invisible');
			nameInput.value = '';
		}
	},
	'submit #add-classroom': function(event, template) {
		var nameInput = template.find('#add-classroom-name')
		Meteor.call('createClassroom', nameInput.value, Meteor.user()._id);
		nameInput.value = '';

		event.preventDefault();
	},
	'click .classroom-link': function(event, template) {
		var destination = Classrooms.findOne(this._id);
		Session.set('leavingCurrentRoom', false);
		Meteor.call('setUserCurrentRoom', Meteor.user()._id, this._id);
		Router.go('classroom', destination);
	}
});