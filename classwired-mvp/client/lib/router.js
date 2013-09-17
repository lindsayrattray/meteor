Router.configure({
	layout: 'main'
});

Router.map(function()
{	
	this.route('classroomManager',
	{
		path: '/',
		template: 'classroomManager',
		renderTemplates:
		{
			'login': { to: 'login' },
			'messages': { to: 'messages' }
		}
	});
	this.route('userAdmin',
	{
		path: '/useradmin',
		template: 'adminUserDashboard',
		renderTemplates:
		{
			'login': { to: 'login' },
			'messages': { to: 'messages' }
		}
	});
	this.route('activity',
	{
		path:'/:name/:activity',
		//data: function() { return Activities.findOne(this.params.activity); }
	});
	//this needs to be at the bottom otherwise it will match all routes
	this.route('classroom',
	{
		path: '/:name',
		data: function() { return Classrooms.findOne({name: this.params.name}); },
		template: 'classroom',
		renderTemplates:
		{
			'login': { to: 'login' },
			'messages': { to: 'messages' }
		}
	});
});