var userCount = Meteor.users.find().count();
if(userCount === 1 || userCount === 0)
{
  teacher = Accounts.createUser({ email: 'teacher@domain.com', username: 'teacher', password: 'test', profile: { name: "Teacher" } });
  Meteor.users.update(teacher, {$set: {permissions: 'teacher'}});

  Accounts.createUser({ email: 'student1@domain.com', username: 'student1', password: 'test', profile: { name: "Student 1" } });
  Accounts.createUser({ email: 'student2@domain.com', username: 'student2', password: 'test', profile: { name: "Student 2" } });
  Accounts.createUser({ email: 'student3@domain.com', username: 'student3', password: 'test', profile: { name: "Student 3" } });
}