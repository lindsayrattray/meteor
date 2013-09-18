var idleActivity = Activities.findOne({ name: 'idle' })
if(!idleActivity)
{
	Activities.insert({ name: 'idle', template: 'activityIdle' });
}