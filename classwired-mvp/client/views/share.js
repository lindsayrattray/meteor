Meteor.subscribe('inputItems');

Template.share.events({
	'click #btn-tick': function() {
		InputItems.update(Session.get('inputItem'), {$set: {answer: true}});
		console.log(InputItems.findOne({userId: Meteor.userId()}).answer);
	},
	'click #btn-cross': function() {
		InputItems.update(Session.get('inputItem'), {$set: {answer: false}});
		console.log(InputItems.findOne({userId: Meteor.userId()}).answer);
	}
});

Template.share.helpers({
	shareResult: function() {
		var thisResult = InputItems.findOne({userId: Meteor.userId()});

		if(!thisResult)
		{
			Meteor.call('setUserShareItem', Meteor.userId(), 0, 0, function(error, result) {
				thisResult = result;
			});
		}
		Session.set('inputItem', thisResult._id)
		return thisResult.input;
	}
});