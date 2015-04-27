Template.kAccountsAdminPanel.helpers({
	users: function() {
		return Meteor.users.find();
	},
	columns: function() {
		return Template.instance().config.tableColumns;
	},
	getAttr: function(cols) {
		var self = this;
		return _.map( cols, function(col) {
			return self[col.name]
		});
	}
});

Template.kAccountsAdminPanel.created = function() {
	var instance = this;
	if( typeof kAccountsAdminConfig != 'undefined' ) {
		instance.config = kAccountsAdminConfig;
	} else {
		instance.config = {
			name: 'Please Configure',
			collections: {}
		}
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
			name: 'Please Configure',
			collections: {}
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