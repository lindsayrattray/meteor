var explainTheWordActivity = Activities.findOne({ name: 'explainTheWord' })
if(!explainTheWordActivity)
{
	Activities.insert({ name: 'explainTheWord', template: 'activityExplainTheWordMain' });
}