// ==============================================
// User Manager object, client side handling of
// users to allow for multiple users on a single
// device and provide some useful methods for 
// dealing with the currently logged in user
// ==============================================

//TODO 
//		- fill out coUser methods
//		- fill out reset and change password functionality
//		- add default callback functionality

UserManager = function() {

	this.subscriptions = {
		systemUsersHandle: Meteor.subscribe('systemUsers');
	}

	// Gets the current user object
	this.get = function() {
		return Meteor.user();
	};

	// Gets a value from the current user object
	this.getValue = function(keys) {
		return GetValue(this.get(), keys);
	}

	// Checks if the user has the role specified
	// eg. Roles.ADMIN
	this.hasRole = function(role) {
		var roles = GetValue(this.get(), ['permissions']);
		return roles && roles.indexOf(role) !== -1;
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
										}
									);
		}
		else
		{
			this.signUp(options);
		}
	};

	// Logout and redirect to root url causing a refresh
	// and dropping all existing session etc.
	this.logout = function() {
		Meteor.logoutOtherClients();
		Meteor.logout(this.logoutCallback(error));
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

	// Overridable callback for signups, takes an options
	// and an error argument
	this.signupCallback = function(options, error) {

	};

	// Overridable callback for logins, takes an options
	// and an error argument
	this.loginCallback = function(options, error) {

	};

	// Overridable callback for logouts, takes an error
	// argument
	this.logoutCallback = function(error) {

	};

	// Callback testing function, just runs each of the
	// callbacks as they are
	this.callbackCheck = function(options, error) {
		this.loginCallback(options, error);
		this.signupCallback(options, error);
		this.logoutCallback(error);
	}

// ==============================================
//	CoUsers handling methods
// ==============================================

	// Returns an array of users currently on this
	// device
	this.coUsers = function() {
		return GetValue(this.get(), ['coUsers']);
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
};