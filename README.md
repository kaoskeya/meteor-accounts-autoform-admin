# meteor-accounts-autoform-admin

WIP.

For use with [kaoskeya:meteor-admin](https://atmospherejs.com/kaoskeya/admin)

Example usage with kaoskeya:meteor-admin:

```
kAdminConfig = {
    name: 'Your Admin',
    collections: {
        "Meteor.users": { 
            verbose: "Users",
            templates: { 
                "crud": { name: 'kAccountsAdminFluid' },
                "new": { name: 'yourCustomAdminCreateModule' }
            } 
        },
    }
}
```

Configure table rows using:

```
kAccountsAdminConfig = {
    tableColumns: [
        { label: 'Name', name: 'profile.name' },
        { label: 'Roles', name: 'getRoles()' },
        { label: 'Account Type', name: 'getAccountType()' },
        { label: 'Email', name: 'getEmail()' },
    ]
}
```

Specify fields or use `dburles:collection-helpers` as shown above.
