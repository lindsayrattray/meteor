// ==============================================
// Activity Manager object, handles the current
// activity
// ==============================================

//TODO
//		- Extend set activity functionality

ActivityManager = function(activity, classroom) {
	var thisClassroom = classroom;
	
	var thisActivity = function() {
		return thisClassroom.getValue(['currentActivity']);
	}

	this.subscriptions = {
		
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
			Meteor._localStorage.setItem('Classwired.ActivityManager.uiState', data);
		},

		load: function() {
			var data = JSON.parse(Meteor._localStorage.getItem('Classwired.ActivityManager.uiState'));
			this.datasource = data || {};
		}
	};

	this.get = function() {
		return ActivityInstances.findOne(thisActivity());
	};

	this.set = function(activityInstance, userManager) {
		var hasAdvancedPermission = userManager.hasRole(Roles.SCHOOL) || userManager.hasRole(Roles.ADMIN);
		var timestamp = Date.parse(new Date());

		if(thisClassroom.getValue(['owner']) === userManager.getValue(['_id']) || hasAdvancedPermission)
		{
			var thisActivityInstance = ActivityInstances.findOne(activityInstance);
			Meteor.call('setCurrentActivity', thisClassroom.get(), activityInstance, timestamp);
			this.subscriptions.componentsHandle = Meteor.subscribe('components', GetValue(thisActivityInstance, ['activityId']));
		}
	};

	this.getValue = function(keys) {
		return GetValue(this.get(), keys);
	};

	this.create = function(activity, userManager) {
		var hasAdvancedPermission = userManager.hasRole(Roles.SCHOOL) || userManager.hasRole(Roles.ADMIN);
		var timestamp = Date.parse(new Date());

		if(thisClassroom.getValue(['owner']) === userManager.getValue(['_id']) || hasAdvancedPermission)
		{
			Meteor.call('addActivity', thisClassroom.get(), activity, timestamp, function(error, result) {
				onCreate(error, result);
			});
		}
	}

	var onCreate = function(error, result) {};
	
	this.setOnCreate = function(fn) {
		onCreate = fn;
	}
}