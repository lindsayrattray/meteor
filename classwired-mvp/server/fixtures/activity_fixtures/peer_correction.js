var peerCorrectionActivity = Activities.findOne({ name: 'peerCorrection' })
var peerCorrectionActivityId = peerCorrectionActivity ? peerCorrectionActivity._id : null;
if(!peerCorrectionActivityId)
{
	peerCorrectionActivityId = Activities.insert({ name: 'peerCorrection', title: 'Peer Correction', shortDescription: 'This is a breif description of the activity', description: 'This is a longer description of the activity, it can be used to describe how the activity works', template: 'activityPeerCorrection_Main'});
}

var peerCorrectionComponentsObjects =  [{ name: 'wordlist', title: 'Wordlist', template: 'activityPeerCorrection_Wordlist', activityId: peerCorrectionActivityId },
										{ name: 'explain', title: 'Explain', template: 'activityPeerCorrection_Correct', activityId: peerCorrectionActivityId }];

for(component in peerCorrectionComponentsObjects)
{
	var thisComponent = Components.findOne(peerCorrectionComponentsObjects[component]);
	if(!thisComponent && peerCorrectionComponentsObjects[component].activityId)
	{
		thisComponent = Components.insert(peerCorrectionComponentsObjects[component]);
	}
}