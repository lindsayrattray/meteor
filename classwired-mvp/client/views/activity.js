Template.activity.events({
	'submit' : function() {
		var myInputValue = $('#myInput').val();
		alert(myInputValue);
		Inputs.insert({
			content: myInputValue,
			author: 'me'
		});
	}
});

Template.activity.helpers({
	currentWord: function() {
		return $('#myInput').val();
	}
});