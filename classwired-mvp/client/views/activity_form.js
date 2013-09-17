Template.activityForm.events({
	'submit' : function() {
		var myInput = $('#myInput');
		var myInputValue = myInput.val();
		var username = Meteor.user().username;
		var roomId = Session.get('roomId');
		
		if(username)
		{
			Inputs.insert({
				content: myInputValue,
				author: username,
				room: roomId
			});
		}

		myInput.val('');

		return false;
	}
});