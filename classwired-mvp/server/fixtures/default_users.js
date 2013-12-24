var userCount = Meteor.users.find().count();
if(userCount <= 1)
{
  teacher = Accounts.createUser({ email: 'teacher@domain.com', username: 'teacher', password: 'test', profile: { name: "Teacher" } });
  Meteor.users.update(teacher, {$set: {permissions: 'teacher'}});

  var thisUserId = Accounts.createUser({ email: 'student1@domain.com', username: 'student1', password: 'test', profile: { name: "Student 1" } });
  Meteor.users.update(thisUserId, { $set: { permissions: 'student' } });

  thisUserId = Accounts.createUser({ email: 'student2@domain.com', username: 'student2', password: 'test', profile: { name: "Student 2" } });
  Meteor.users.update(thisUserId, { $set: { permissions: 'student' } });

  thisUserId = Accounts.createUser({ email: 'student3@domain.com', username: 'student3', password: 'test', profile: { name: "Student 3" } });
  Meteor.users.update(thisUserId, { $set: { permissions: 'student' } });
}