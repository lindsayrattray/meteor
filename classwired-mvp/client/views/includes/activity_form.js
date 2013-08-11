Template.activityForm.events({
	'submit' : function() {
		var myInput = $('#myInput');
		var myInputValue = myInput.val();
		var username = Session.get('username');
		
		if(username != undefined)
		{
			Inputs.insert({
				content: myInputValue,
				author: username
			});
			Session.set('new-input-available', 'true');
		}

		myInput.val('');

		return false;
	}
});