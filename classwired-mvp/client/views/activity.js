Template.activity.events({
	'submit' : function() {
		alert($('#myWord').val())
	}
});

Template.activity.helpers({
	currentWord: function() {
		return $('#myWord').val();
	}
});