
//some internet dude's string trim function, it's not functional but it'll
//do for now
function trim (str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

var updateBrainstorm = _.debounce(function(item, content) {
	var oldItem = Brainstorm_Items.findOne(item._id);

	if(oldItem && oldItem.text !== content)
	{
		Brainstorm_Items.update(item._id, { $set: { text: content } });
	}

	Session.set('editingItem', false);
}, 1000, false);

Template.activityBrainstorm_Brainstorm_Student.rendered = function() {
	var isEditing = Session.get('editingItem');
	if(!isEditing)
	{
		var $brainstormContainer = $('.student > ul');
		$brainstormContainer.stop().animate({ scrollTop: $brainstormContainer.prop("scrollHeight") }, 1000);
	}	
};

Template.activityBrainstorm_Brainstorm_Student.events({
	'blur [contenteditable]': function(event, template) {
		updateBrainstorm(this, trim($(event.target).text()));
	},
	'keyup [contenteditable]': function(event, template) {
		updateBrainstorm(this, trim($(event.target).text()));
	},
	'cut [contenteditable]': function(event, template) {
		updateBrainstorm(this, trim($(event.target).text()));
	},
	'paste [contenteditable]': function(event, template) {
		updateBrainstorm(this, trim($(event.target).text()));
	},
	'focus [contenteditable]': function(event, template) {
		Session.set('editingItem', true);
	},
	'submit .student form': function(event, template) {
		var userId = Meteor.userId();
		if(userId)
		{
			var brainstormItem = {
				text: template.find('.student form input').value,
				userId: userId,
				classroomId: CurrentClassroom.getValue(['_id']),
				activityInstanceId: CurrentClassroom.currentActivity.getValue(['_id'])
			};
			if(!Brainstorm_Items.findOne(brainstormItem))
			{
				brainstormItem.created_timestamp = Date.parse(new Date());
				Brainstorm_Items.insert(brainstormItem);
			}
		}
		template.find('.student form input').value = '';

		event.preventDefault();
	}
});

Template.activityBrainstorm_Brainstorm_Student.helpers({
	brainstormItems: function() {
		return Brainstorm_Items.find({}, { sort: { created_timestamp: 1 } });
	}
});