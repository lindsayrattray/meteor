var explainTheWordActivity = Activities.findOne({ name: 'explainTheWord' })
var explainTheWordActivityId = explainTheWordActivity ? explainTheWordActivity._id : null;
if(!explainTheWordActivityId)
{
	explainTheWordActivityId = Activities.insert({ name: 'explainTheWord', title: 'Explain the Word', shortDescription: 'This is a breif description of the activity', description: 'This is a longer description of the activity, it can be used to describe how the activity works', template: 'activityExplainTheWord_Main'});
}

var explainTheWordComponentsObjects =  [{ name: 'wordlist', title: 'Wordlist', template: 'activityExplainTheWord_Wordlist', activityId: explainTheWordActivityId },
										{ name: 'explain', title: 'Explain', template: 'activityExplainTheWord_Explain', activityId: explainTheWordActivityId }];

for(component in explainTheWordComponentsObjects)
{
	var thisComponent = Components.findOne(explainTheWordComponentsObjects[component]);
	if(!thisComponent && explainTheWordComponentsObjects[component].activityId)
	{
		thisComponent = Components.insert(explainTheWordComponentsObjects[component]);
	}
}