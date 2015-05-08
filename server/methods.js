Meteor.methods({
	kCreateUser: function(doc) {
		// user_id = Accounts.createUser({ username: doc.username, password: doc.password });
		// Roles.addUsersToRoles(user_id, ['admin']);
	},
	kRemoveRole: function(user, role) {
		if( Roles.userIsInRole( this.userId, ["admin"]) ) {
			if( user == this.userId && role == "admin" ) {
				throw new Meteor.Error("You cannot revoke your admin priviliges. You're kinda too cool :)");
			} else {
				var user = Meteor.users.findOne({ _id: user }, { roles: 1 });
				Roles.setUserRoles(user, _.without(user.roles, role) );
				return true;
			}
		} else {
			throw new Meteor.Error("Need to be admin to execute this action.");
		}
	},
	kAssignRole: function(user, role) {
		if( Roles.userIsInRole( this.userId, ["admin"]) ) {
			Roles.addUsersToRoles(user, role );
			return true;
		} else {
			throw new Meteor.Error("Need to be admin to execute this action.");
		}
	}
});

Meteor.publish(null, function (){ 
	return Meteor.roles.find({})
})