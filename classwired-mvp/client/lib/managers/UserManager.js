//TODO move roles into common lib

Roles = {};
Roles.ADMIN = 'administrator';
Roles.SCHOOL = 'school';
Roles.TEACHER = 'teacher';
Roles.STUDENT = 'student';


// ==============================================
// User Manager object, client side handling of
// users to allow for multiple users on a single
// device and provide some useful methods for 
// dealing with the currently logged in user
// ==============================================

//TODO fill out coUser methods

UserManager = function() {
	this.get = function() {
		return Meteor.user();
	};

	// Checks if the user has the role specified
	// eg. Roles.ADMIN
	this.hasRole = function(role) {
		if(this.get() && this.get().permissions && this.get().permissions.indexOf(role) !== -1)
		{
			return true;
		}
		return false;
	};

	// Logs a user in if an account exists, otherwise
	// signs them up, opitions object must include
	// email and password, if new signup it will need a
	// name
	this.login = function(options) {
		var user = Meteor.users.findOne({ "emails.address": options.email });

		if(user)
		{
			Meteor.loginWithPassword({  email: options.email },
										options.password,
										function(error) {
											this.loginCallback(options, error);
										});
		}
		else
		{
			this.signUp(options);
		}

		this.deps.changed();
	};

	// Logout and redirect to root url causing a refresh
	// and dropping all existing session etc.
	this.logout = function() {
		Meteor.logout();
		window.location = location.host;
		location.reload(true);
	};

	// Signup is a private function, called by login
	// Accepts an options object that must contain
	// name, email and password
	var signUp = function(options) {
		Accounts.createUser({
								email: options.email, password: options.password, profile: { name: options.name }
							},
							function(error)
							{
								this.signupCallback(options, error);
							});
	};

	// Reset the user's password using options as the
	// selector and new password information
	this.resetPassword = function(options) {

	};

	// Change the user's password, requires the old
	// password to be passed within options
	this.changePassword = function(options) {

	};

	this.signupCallback = function(options, error) {

	};

	this.loginCallback = function(options, error) {

	};

	this.callbackCheck = function(options, error) {
		this.loginCallback(options, error);
		this.signupCallback(options, error);
	}

// ==============================================
//	CoUsers handling methods
// ==============================================

	// Returns an array of users currently on this
	// device
	this.coUsers = function() {
		if(this.get() && this.get().coUsers)
		{
			return this.get().coUsers;
		}
		return null;
	};

	// Selector should be in the same format as a
	// Mongo selector, eg: { profile.name : 'foo' }
	this.getCoUsers = function(selector) {
		return _.findWhere(this.coUsers(), selector);
	};

	// Returns the first result of getCoUsers(selector)
	this.getCoUser = function(selector) {
		return this.getCoUsers(selector)[0];
	};

	// Creates a new user account and adds it as a 
	// coUser, accepts an options object which must
	// contain an email address, name and password
	// in the format { email: foo@bar.baz, password: 'password' }
	this.addNewCoUser = function(options) {

	};

	// Adds a coUser, checking first if there is an 
	// existing user account, otherwise calling 
	// addNewCoUser. Accepts an options argument
	// which must contain an email address and password
	// in the format { email: foo@bar.baz, password: 'password' }
	this.addCoUser = function(options) {

	};

	// Removes the coUser matching the selector
	this.removeCoUser = function(selector) {

	};
}