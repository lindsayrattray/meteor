Router.map(function() {
	this.route('home', {
	path: '/',
	template: 'master',
	renderTemplates: {
		'activity': { to: 'activity' },
		'login': { to: 'login' },
		'messages': { to: 'messages'}
	}});
});