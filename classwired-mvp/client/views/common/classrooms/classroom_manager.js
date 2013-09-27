Template.classroomManager.rendered = function() {
	if(Meteor.user() && Meteor.user().currentRoom && !Session.get('leavingCurrentRoom'))
	{
		var userCurrentClassroom = Classrooms.findOne(Meteor.user().currentRoom);
		if(userCurrentClassroom.open)
		{
			Router.go('classroom', userCurrentClassroom)
		}
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
		var nameInput = template.find('#add-classroom-name')
		if($addClassroomContainer.hasClass('hidden'))
		{
			$addClassroomContainer.removeClass('hidden');
			nameInput.focus();
		}
		else
		{
			nameInput.value = '';
			$addClassroomContainer.addClass('hidden');
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