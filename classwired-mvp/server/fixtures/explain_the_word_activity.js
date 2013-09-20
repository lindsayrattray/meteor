var explainTheWordActivity = Activities.findOne({ name: 'explainTheWord' })
var explainTheWordActivityId = explainTheWordActivity ? explainTheWordActivity._id : null;
if(!explainTheWordActivityId)
{
	explainTheWordActivityId = Activities.insert({ name: 'explainTheWord', template: 'activityExplainTheWordMain'});
}

var explainTheWordComponentsObjects =  [{ name: '', template: '', activityId: explainTheWordActivityId },
										{ name: '', template: '', activityId: explainTheWordActivityId },
										{ name: '', template: '', activityId: explainTheWordActivityId },
										{ name: '', template: '', activityId: explainTheWordActivityId }];

for(component in explainTheWordComponentsObjects)
{
	var thisComponent = Components.findOne(explainTheWordComponentsObjects[component]);
	if(!thisComponent && explainTheWordComponentsObjects[component].activityId)
	{
		thisComponent = Components.insert(explainTheWordComponentsObjects[component]);
	}
}