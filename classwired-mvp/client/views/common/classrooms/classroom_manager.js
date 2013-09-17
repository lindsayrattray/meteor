Template.classroomManager.helpers({
	classrooms: function() {
		return Classrooms.find();
	},
	ownerName: function(classroom) {
		return Meteor.users.findOne(classroom.owner).profile.name;
	}
});

Template.classroomManager.events({
	'click #btn-add-classroom': function() {
		var $addClassroomContainer = $('#add-classroom-container');
		if($addClassroomContainer.hasClass('hidden'))
		{
			$addClassroomContainer.removeClass('hidden');
		}
		else
		{
			$addClassroomContainer.addClass('hidden');
		}
	},
	'submit #add-classroom': function(event, template) {
		var name = template.find('#add-classroom-name').value;
		Meteor.call('createClassroom', name, Meteor.user()._id);
		event.preventDefault();
	}
});