Meteor.subscribe('rooms');

Deps.autorun(function() {
	var userName = Meteor.user() ? Meteor.user().profile.name : undefined;
	Meteor.subscribe('inputs', userName);
});