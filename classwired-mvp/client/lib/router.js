Router.configure({
	layout: 'main'
});

Router.map(function()
{	
	this.route('classroomManager',
	{
		path: '/',
		template: 'classroomManager',
	});
	this.route('userAdmin',
	{
		path: '/useradmin',
		template: 'adminUserDashboard',
	});
	//this needs to be at the bottom otherwise it will match all routes
	this.route('classroom',
	{
		path: '/:name',
		data: function() { return Classrooms.findOne({name: this.params.name}); },
		template: 'classroom',
		notFoundTemplate: 'notFound'
	});
});