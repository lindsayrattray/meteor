Template.activityForm.events({
	'submit' : function() {
		var myInputValue = $('#myInput').val();
		Inputs.insert({
			content: myInputValue,
			author: 'me'
		});
	}
});