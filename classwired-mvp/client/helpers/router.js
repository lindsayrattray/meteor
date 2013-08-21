Router.configure({
	layout: 'main'
});

Router.map(function()
{	
	this.route('home', 
	{	
		path: '/',
		template: 'activity',
		renderTemplates: 
		{
			'activity': { to: 'activity' },
			'login': { to: 'login' },
			'messages': { to: 'messages'}
		}
	});
});