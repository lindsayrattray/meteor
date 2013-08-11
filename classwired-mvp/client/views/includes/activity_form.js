Template.activityForm.events({
	'submit' : function() {
		var myInput = $('#myInput');
		var myInputValue = myInput.val();
		var username = Session.get('username');
		var roomId = Session.get('room-id');
		
		if(username != undefined)
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