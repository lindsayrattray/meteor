Template.activityForm.events({
	'submit' : function() {
		var myInput = $('#myInput');
		var myInputValue = myInput.val();
		var username = Session.get('username');
<<<<<<< HEAD
		
=======
		var roomId = Session.get('room-id');

>>>>>>> allow switching of room state
		if(username != undefined)
		{
			Inputs.insert({
				content: myInputValue,
<<<<<<< HEAD
				author: username
			});
			Session.set('new-input-available', 'true');
		}

		myInput.val('');

=======
				author: username,
				room: roomId
			});
		}
>>>>>>> allow switching of room state
		return false;
	}
});