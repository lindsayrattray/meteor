Template.activity.events({
	'submit' : function() {
		alert($('#myInput').val())
	}
});

Template.activity.helpers({
	currentWord: function() {
		return $('#myInput').val();
	}
});