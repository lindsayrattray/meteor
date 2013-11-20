// ==============================================
// Activity Manager object, handles the current
// activity
// ==============================================

//TODO
//		- Extend set activity functionality

ActivityManager = function(activity, classroom) {
	var thisClassroom = classroom;
	var thisActivity = JSON.parse(Meteor._localStorage.getItem('Classwired.activity'));

	this.subscriptions = {
		componentsHandle: Meteor.subscribe('components')
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
			Meteor._localStorage.setItem('Classwired.ActivityManager.uiState');
		},

		load: function() {
			var data = JSON.parse(Meteor._localStorage.getItem('Classwired.ActivityManager.uiState'));
			this.datasource = data || {};
		}
	};

	this.get = function() {
		return ActivityInstances.findOne(thisActivity);
	};

	this.set = function(activity) {
		thisActivity = activity;
		Meteor._localStorage.setItem('Classwired.activity', JSON.stringify(activity));
	};

	this.getValue = function(keys) {
		return GetValue(this.get(), keys);
	};
}