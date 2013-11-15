// ==============================================
// User Manager object, client side handling of
// users to allow for multiple users on a single
// device and provide some useful methods for 
// dealing with the currently logged in user
// ==============================================

//TODO 
//		- Set up login handler stuff
//		- fill out coUser methods
//		- fill out reset and change password functionality

UserManager = function() {

	this.subscriptions = {
		systemUsersHandle: Meteor.subscribe('systemUsers')
	};

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
		},

		ensureDeps: function(key) {
			if(!this.deps[key]) {
				this.deps[key] = new Deps.Dependency;
			}
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
											this.onLogin(options, error);
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
		Meteor.logout(function(error) { this.onLogout(error) });
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
								this.onSignup(options, error);
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
	this.onSignup = function(options, error) {

	};

	// Overridable callback for logins, takes an options
	// and an error argument
	this.onLogin = function(options, error) {

	};

	// Overridable callback for logouts, takes an error
	// argument
	this.onLogout = function(error) {

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

LoginManager = function(userManager)
{
	var thisUserManager = userManager;

	this.loginState = {
		STATE: {
			LOGIN: 0,
			SIGNUP: 1
		},

		STAGE: {
			EMAIL: 'email',
			NAME: 'name',
			PASSWORD: 'password',
			CONFIRM_PASSWORD: 'confirmPassword'
		},

		currentState: null,
		currentStage: null,
		currentStageDeps: null,

		reset: function() {
			this.currentStage = null;
			this.currentState = null;
			this.currentStageDeps.changed();
		},

		ensureCurrentStageDeps: function() {
			if(!this.currentStageDeps)
			{
				this.currentStageDeps = new Deps.Dependency;
			}
		},

		reactiveCurrentStage: function() {
			this.ensureCurrentStageDeps();
			this.currentStageDeps.depend();
			return this.currentStage;
		},

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