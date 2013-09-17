function ensureUniqueInput(input, inputArray) {
	input = !input ? Random.choice(inputArray) : input;
	return !InputItems.findOne(input._id) ? input : ensureUniqueInput(Random.choice(inputArray), inputArray);
}

Meteor.methods({
	setUserShareItem: function(thisUserId, onBeforeCallback, onAfterCallback) {
		var inputsArray = Inputs.find({}, { fields: { content: 1 } }).fetch();
		var result;
		
		//onBeforeCallback(userId, inputsArray, result, error);

		if(inputsArray.length > InputItems.find().fetch().length)
		{
			result = ensureUniqueInput(result, inputsArray);
		}

		//onAfterCallback(userId, inputsArray, result, error);
		
		if(result)
		{
			InputItems.insert({
				_id: result._id,
				userId: thisUserId,
				input: result.content,
			});	
		}

		return result;
	}
});