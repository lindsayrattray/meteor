var updateBrainstorm = _.debounce(function(item, content) {
	Brainstorm_Items.update(item._id, { $set: { item: content } });
	Session.set('editingItem', false);
}, 1000, false);

Template.activityBrainstorm_Brainstorm_Student.rendered = function() {
	var isEditing = Session.get('editingItem');
	if(!isEditing)
	{
		var $brainstormContainer = $('.brainstorm.student ul');
		$brainstormContainer.stop().animate({ scrollTop: $brainstormContainer.prop("scrollHeight") }, 1000);
	}	
};

Template.activityBrainstorm_Brainstorm_Student.events({
	'input .brainstorm.student ul textarea': function(event, template) {
		updateBrainstorm(this, event.target.value);
	},
	'focus .brainstorm.student ul textarea': function() {
		Session.set('editingItem', true);
	},
	'blur .wordlist.student ul textarea': function() {
		Session.set('editingItem', false);
	},
	'submit .wordlist.student form': function(event, template) {
		var user= Meteor.user();
		if(user)
		{
			var brainstormItem = {
				text: template.find('.brainstorm.student form textarea').value,
				userId: user._id,
				classroomId: template.data.classroom._id
			};
			if(!Brainstorm_Items.findOne(brainstormItem))
			{
				brainstormItem.created_timestamp = Date.parse(new Date());
				Brainstorm_Items.insert(brainstormItem);
			}
		}
		template.find('.brainstorm.student form textarea').value = '';

		event.preventDefault();
	}
});

Template.activityBrainstorm_Brainstorm_Student.helpers({
	brainstormItems: function() {
		return Brainstorm_Items.find({}, { sort: { created_timestamp: 1 } });
	}
})