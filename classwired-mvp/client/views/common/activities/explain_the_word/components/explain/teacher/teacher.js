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
	var statsMode = Session.get('statsMode');

	setView(statsMode);
});