Deps.autorun(function() {
	Meteor.subscribe('inputs', Session.get('username'));
});
Deps.autorun(function() {
	if(Session.get('new-input-available') == 'true') {
		alert('new input');
		Session.set('new-input-available', 'false');
		$("#input-list").scrollTop($("#input-list")[0].scrollHeight);
	}
});