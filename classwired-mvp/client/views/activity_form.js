Template.activityForm.events({
	'submit' : function() {
		var myInput = $('#myInput');
		var myInputValue = myInput.val();
		var username = Meteor.user().username;
		
		if(username)
		{
			Inputs.insert({
				content: myInputValue,
				author: username
			});
		}

		myInput.val('');

		return false;
	}
});