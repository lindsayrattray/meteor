Deps.autorun(function() {Meteor.subscribe('inputs', Session.get('username'))});

console.log('current username = ' + Session.get('username'));