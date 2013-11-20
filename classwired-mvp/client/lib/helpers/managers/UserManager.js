// ==============================================
// User Manager object, client side handling of
// users to allow for multiple users on a single
// device and provide some useful methods for 
// dealing with the currently logged in user
// ==============================================

//TODO
//		- fill out coUser methods
//		- fill out reset and change password functionality

UserManager = function() {

	// Subscription handle container
	this.subscriptions = {
		systemUsersHandle: Meteor.subscribe('systemUsers')
	};

	// Reactive datastore for ui related variables
	this.uiState = {
		
		datasource: {},
		deps: {},

		get: function(key) {
			this.ensureDeps(key);
			this.deps[key].depend();
			return this.datasource[key];
		},
		
		set: function(key, value) {
			this.ensureDeps(key);
			this.datasource[key] = value;
			this.deps[key].changed();

			this.save();
		},

		ensureDeps: function(key) {
			if(!this.deps[key]) {
				this.deps[key] = new Deps.Dependency;
			}
		},

		clear: function() {
			for(key in this.datasource)
			{
				this.set(this.datasource[key], null);
			}

			this.datasource = {};
			this.deps = {};
		},

		save: function() {
			var data = JSON.stringify(this.datasource);
			Meteor._localStorage.setItem('Classwired.UserManager.uiState');
		},

		load: function() {
			var data = JSON.parse(Meteor._localStorage.getItem('Classwired.UserManager.uiState'));
			this.datasource = data || {};
		}
	};

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

	// Overridable callback closure for signups, takes an options
	// and an error argument
	var onSignup = function(options, error) {};

	// Set the setOnSignup callback to fn, fn must accept
	// an options object then an error value as its
	// two arguments
	this.setOnSignup = function(fn) {
		onSignup = fn;
	};

	// Overridable callback closure for logins, takes an options
	// and an error argument
	var onLogin = function(options, error) {};

	// Set the login callback to fn, fn must accept
	// an options object then an error value as its
	// two arguments
	this.setOnLogin = function(fn) {
		onLogin = fn;
	};

	// Overridable callback closure for logouts, takes an error
	// argument
	var onLogout = function(error) {};

	// Set the logout callback to fn, fn must accept
	// an error value as its only argument
	this.setOnLogout = function(fn) {
		onLogout = fn;
	}

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
											onLogin(options, error);
									});
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
		Meteor.logout(function(error)   { 
											onLogout(error);
										});
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
								onSignup(options, error);
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

	// Callback testing function, just runs each of the
	// callbacks as they are
	this.callbackCheck = function(options, error) {
		this.onLogin(options, error);
		this.onSignup(options, error);
		this.onLogout(error);
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

// ==============================================
// Login Handler utility object
// ==============================================

//TODO
//		- Move LoginManager into its own file

LoginManager = function(userManager)
{
	// Keep a reference to a UserManager instance
	var thisUserManager = userManager;

	// Object to handle login states
	this.loginState = {
		
		// Definition of available states
		STATE: {
			LOGIN: 0,
			SIGNUP: 1
		},

		// Definition of available login/signup stages
		STAGE: {
			EMAIL: 'email',
			NAME: 'name',
			PASSWORD: 'password',
			CONFIRM_PASSWORD: 'confirmPassword'
		},

		// Keep track of currentState and Stage,
		// currentStage is intended for use as a
		// reactive data source
		currentState: null,
		currentStage: null,
		currentStageDeps: null,

		// Resets the current login state and stage
		reset: function() {
			this.currentStage = null;
			this.currentState = null;
			this.currentStageDeps.changed();
		},

		// Ensures the currentStage dependencies are
		// set up
		ensureCurrentStageDeps: function() {
			if(!this.currentStageDeps)
			{
				this.currentStageDeps = new Deps.Dependency;
			}
		},

		// Reactive accessor for the currentStage
		reactiveCurrentStage: function() {
			this.ensureCurrentStageDeps();
			this.currentStageDeps.depend();
			return this.currentStage;
		},

		// Function to execute in the 'email' stage
		// validation can be handled here, takes a user's
		// email and checks if it already exists in the
		// database. If it already exists, progress to 
		// login state and password stage, otherwise
		// progress to the signup state and the name stage
		email: function(options) {
			if(options.email && options.email !== '')
			{
				var user = Meteor.users.findOne({ "emails.address": options.email });
				this.ensureCurrentStageDeps();

				if(user)
				{
					this.currentState = this.STATE.LOGIN;
					this.currentStage = this.STAGE.PASSWORD;
				}
				else
				{
					this.currentState = this.STATE.SIGNUP;
					this.currentStage = this.STAGE.NAME;
				}

				this.currentStageDeps.changed();
			}
			else
			{
				alert('Please enter your email address!');
			}
		},

		// Function to execute in the 'name' stage
		// validation can be handled here, takes a user's
		// name and progresses to the password stage
		name: function(options) {
			this.ensureCurrentStageDeps();

			if(options.name && options.name !== '')
			{
				this.currentStage = this.STAGE.PASSWORD;
				this.currentStageDeps.changed();
			}
			else
			{
				alert('Please enter your name!');
			}
		},

		// Function to execute in the 'password' stage
		// validation can be handled here, logs in a user
		// if in the login state, otherwise progresses to
		// the confirmation stage
		password: function(options) {
			this.ensureCurrentStageDeps();

			if(options.password && options.password !== '')
			{
				if(this.currentState === this.STATE.LOGIN)
				{
					thisUserManager.login(options);
					this.reset();
				}
				else
				{
					this.currentStage = this.STAGE.CONFIRM_PASSWORD;
					this.currentStageDeps.changed();
				}
			}
			else
			{
				alert('Please enter your password!');
			}
		},

		// Function to execute in the 'confirmPassword' stage
		// validation can be handled here, signs up a user if
		// their password matches the confirmation, then resets
		// login state for next time
		confirmPassword: function(options) {
			this.ensureCurrentStageDeps();

			if(options.confirmPassword && options.confirmPassword === options.password)
			{
				thisUserManager.signUp(options);
				this.reset();
			}
			else
			{
				alert('Passwords don\'t match');
			}
		}
	};

	// Handles calls to the loginState handler functions 
	this.doLogin = function(options)
	{
		if(this.loginState.currentStage)
		{
			this.loginState[this.loginState.currentStage](options, thisUserManager);
		}
		else
		{
			this.loginState.ensureCurrentStageDeps();
			this.loginState.currentStage = this.loginState.STAGE.EMAIL;
			this.loginState.currentStageDeps.changed();
		}
	}
}