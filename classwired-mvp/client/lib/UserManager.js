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
	this.user = Meteor.user();

	// Checks if the user has the role specified
	// eg. Roles.ADMIN
	this.hasRole = function(role) {
		if(this.user && this.user.permissions && this.user.permissions.indexOf(role) !== -1)
		{
			return true;
		}
		return false;
	};

	// Returns an array of users currently on this
	// device
	this.coUsers = function() {
		if(this.user && this.user.coUsers)
		{
			return this.user.coUsers;
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
		return getCoUsers(selector)[0];
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