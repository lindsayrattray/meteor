// Global Static definition of roles

Roles = {};
Roles.ADMIN = 'administrator';
Roles.SCHOOL = 'school';
Roles.TEACHER = 'teacher';
Roles.STUDENT = 'student';

// Handlebars Helpers

if(Meteor.isClient)
{
	Handlebars.registerHelper('roles', function() {
		return _.values(Roles);
	});

	Handlebars.registerHelper('studentRole', function() {
		return Roles.STUDENT;
	});

	Handlebars.registerHelper('teacherRole', function() {
		return Roles.TEACHER;
	});

	Handlebars.registerHelper('schoolRole', function() {
		return Roles.SCHOOL;
	});

	Handlebars.registerHelper('adminRole', function() {
		return Roles.ADMIN;
	});
}