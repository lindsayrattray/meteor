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
			'login': { to: 'login' },
			'messages': { to: 'messages'}
		}
	});
});