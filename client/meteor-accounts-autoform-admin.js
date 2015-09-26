Template.kAccountsAdminPanel.helpers({
	users: function() {
		return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
	},
	columns: function() {
		return Template.instance().config.tableColumns;
	},
	getAttr: function(cols) {
		var self = this;
		return _.map( cols, function(col) {
			if( col.name.indexOf("()") != -1 ) {
				return self[ col.name.substr( 0, col.name.length - 2 ) ]();
			} else {
				console.log( self, col, col.name, self[col.name] );
				var val = self;
				_.each( col.name.split("."), function(index){
					val = val[index];
				});
				return val;
			}
		});
	},
	customActions: function() {
		return Template.instance().customActions;
	}
});

Template.kAccountsAdminPanel.created = function() {
	var instance = this;
	if( typeof kAccountsAdminConfig != 'undefined' ) {
		instance.config = kAccountsAdminConfig;
	} else {
		instance.config = {
			tableColumns: [
				{ label: 'ID', name: '_id'}
			]
		}
	}

	if( Template.instance().config.hasOwnProperty("templates") ) {
		instance.customActions = Template.instance().config.templates.custom;
	} else {
		instance.customActions;
	}
}

Template.kAccountsAdminPanelCreate.helpers({
	userSchema: function() {
		return Template.instance().config.schema;
	}
});

Template.kAccountsAdminPanelCreate.created = function() {
	var instance = this;
	if( typeof kAccountsAdminConfig != 'undefined' ) {
		instance.config = kAccountsAdminConfig;
	} else {
		instance.config = {
			columns: [
				{ label: 'ID', name: '_id'}
			]
		}
	}
}

Template.kAccountsAdminPanelCreate.rendered = function() {
	AutoForm.hooks({
		kAccountsAdminPanelCreateForm: {
			onSuccess: function(operation, result, template) {
				$('#cancelAction').trigger('click');
				toastr.success('Action completed');
			},
			onError: function(operation, error, template) {
				toastr.error(error.message)
			}
		}
	});
}

Template.kManageRoles.helpers({
	profile: function() {
		return JSON.stringify( this.profile, null, 4 );
	},
	roles: function() {
		return Meteor.users.findOne({ _id: this._id }, { roles: 1 }).roles;
	},
	availableRoles: function() {
		return _.difference( 
			_.map(Meteor.roles.find().fetch(), function(r){ return r.name }),
			Meteor.users.findOne({ _id: this._id }, { roles: 1 }).roles
		);
	}
});

Template.kManageRoles.events({
	'click .remove-role': function(e, tmpl) {
		var role = String(this);
		Meteor.call("kRemoveRole", tmpl.data._id, role, function(err){
			if(err) {
				toastr.clear();
				toastr.error( err.message )
			} else {
				toastr.clear();
				toastr.success( "User role updated successfully." )
			}
		});
	},
	'click #addRole a': function(e, tmpl) {
		var role = String(this);
		Meteor.call("kAssignRole", tmpl.data._id, role, function(err){
			if(err) {
				toastr.clear();
				toastr.error( err.message )
			} else {
				toastr.clear();
				toastr.success( "User role updated successfully." )
			}
		});
		e.preventDefault();
		return false;
	},
});

