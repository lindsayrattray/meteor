Template.adminUserDashboardItem.rendered = function() {
	var checkboxes = this.findAll('.chk-role');
	for (checkbox in checkboxes)
	{
		checkboxes[checkbox].checked = false;
	}

	for (permissionIndex in this.data.permissions)
	{
		this.find('#' + this.data._id + ' #chk-role-' + this.data.permissions[permissionIndex]).checked = true;
	}

	for (checkbox in checkboxes)
	{
		if(this.data._id === Meteor.user()._id)
		{
			checkboxes[checkbox].disabled = true;
		}
	}
}

Template.adminUserDashboardItem.events({
	'click .chk-role': function(event, template) {
		var permission = event.srcElement.id.substring(9);
		var userId = template.find('.userId').innerHTML;
		
		if(event.srcElement.checked)
		{
			Meteor.call('addUserToRole', userId, permission);
		}
		else
		{
			Meteor.call('removeUserFromRole', userId, permission)
		}
	}
});