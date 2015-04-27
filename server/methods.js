Meteor.methods({
	kCreateUser: function(doc) {
		user_id = Accounts.createUser({ username: doc.username, password: doc.password });
		Roles.addUsersToRoles(user_id, ['admin']);
	}
});