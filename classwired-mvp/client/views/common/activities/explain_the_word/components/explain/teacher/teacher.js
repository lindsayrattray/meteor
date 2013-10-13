Deps.autorun(function() {
	var $container = $('.explain.teacher .container');

	if(Session.get('statsMode') === 'class')
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
});