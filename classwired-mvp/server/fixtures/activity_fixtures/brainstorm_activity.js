var brainstormActivity = Activities.findOne({ name: 'brainstorm' });
var brainstormActivityId = brainstormActivity ? brainstormActivityId : null;

if(!brainstormActivityId)
{
	brainstormActivityId = Activities.insert({ name: 'brainstorm', title: 'Brainstorm', template: 'activityBrainstorm_Main'});
}

var brainstormComponentsObjects = [{ name: 'brainstorm', title: 'Brainstorm', template: 'activityBrainstorm_Brainstorm', activityId: brainstormActivityId }];

for(component in brainstormComponentsObjects)
{
	var thisComponent = Components.findOne(brainstormComponentsObjects[component]);
	if(!thisComponent && brainstormComponentsObjects[component].activityId)
	{
		thisComponent = Components.insert(brainstormComponentsObjects[component]);
	}
}