//TODO
//		- Create a maybe monad

// General purpose getter for objects

GetValue = function(object, keys)
{
	var result = object;

	for(index in keys)
	{
		if(result)
		{
			result = result[keys[index]];
		}
		else
		{
			return result;
		}
	}
	return result;
};

// General purpose getter for objects when multiple
// values are expected

GetValues = function(object, keysCollection)
{
	var results = [];

	for(keyIndex in keysCollection)
	{
		var result = object;

		for(index in keysCollection[keyIndex])
		{
			if(result)
			{
				result = result[keysCollection[keyIndex][index]];
			}
			else
			{
				break;
			}
		}

		results.push(result);
	}
};
