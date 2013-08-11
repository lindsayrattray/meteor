Template.activityForm.events({
	'submit' : function() {
		var myInputValue = $('#myInput').val();
		var username = Session.get('username');
		Inputs.insert({
			content: myInputValue,
			author: username
		});
		return false;
	}
});