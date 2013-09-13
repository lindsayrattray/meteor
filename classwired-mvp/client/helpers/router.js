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
			'messages': { to: 'messages' }
		}
	});
	this.route('share',
	{
		path: '/share',
		template: 'share',
		renderTemplates:
		{
			'login': { to: 'login' },
			'messages': { to: 'messages' }
		}
	});
	this.route('userAdmin',
	{
		path: '/useradmin',
		template: '',
		renderTemplates:
		{
			'login': { to: 'login' },
			'messages': { to: 'messages' }
		}
	});
});