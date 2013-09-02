Meteor.subscribe('inputItems');

Template.share.helpers({
	shareResult: function() {
		var thisResult = InputItems.findOne({userId: Meteor.userId()});

		if(!thisResult)
		{
			Meteor.call('setUserShareItem', Meteor.userId(), 0, 0, function(error, result) {
				thisResult = result;
			});
		}

		console.log(thisResult);
		return thisResult.input;
	}
});