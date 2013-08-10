Template.activityForm.events({
	'submit' : function() {
		var myInputValue = $('#myInput').val();
		alert(myInputValue);
		Inputs.insert({
			content: myInputValue,
			author: 'me'
		});
	}
});