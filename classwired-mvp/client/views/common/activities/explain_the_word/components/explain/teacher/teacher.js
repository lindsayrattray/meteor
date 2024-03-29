var setView = function(statsMode) {
	var $container = $('.explain.teacher .container');

	if(statsMode === 'class')
	{
		if($container.hasClass('activity'))
		{
			$container.removeClass('activity');
		}
		$container.addClass('class');
	}
	else
	{
		if($container.hasClass('class'))
		{
			$container.removeClass('class');
		}
		$container.addClass('activity');
	}
}

Deps.autorun(function() {
	var statsMode = CurrentClassroom.currentActivity.uiState.get('statsMode');

	setView(statsMode);
});

Template.activityExplainTheWord_Explain_Teacher.rendered = function() {
	var statsMode = CurrentClassroom.currentActivity.uiState.get('statsMode');

	setView(statsMode);
}