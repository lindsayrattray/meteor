var explainTheWordActivity = Activities.findOne({ name: 'explainTheWord' })
var explainTheWordActivityId = explainTheWordActivity ? explainTheWordActivity._id : null;
if(!explainTheWordActivityId)
{
	explainTheWordActivityId = Activities.insert({ name: 'explainTheWord', title: 'Explain the Word', template: 'activityExplainTheWord_Main'});
}

var explainTheWordComponentsObjects =  [{ name: 'wordlist_entry', title: 'Wordlist', template: 'activityExplainTheWord_Wordlist_Entry', activityId: explainTheWordActivityId },
										{ name: 'explain', title: 'Explain', template: 'activityExplainTheWord_Explain', activityId: explainTheWordActivityId },
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