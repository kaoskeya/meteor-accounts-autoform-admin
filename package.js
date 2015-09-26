Package.describe({
  name: 'kaoskeya:accounts-autoform-admin',
  version: '0.0.2_3',
  // Brief, one-line summary of the package.
  summary: 'Manage users module for kaoskeya:admin - boostrap based admin panel.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/kaoskeya/meteor-accounts-autoform-admin',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use(['templating'], 'client');

  api.addFiles([
    'client/meteor-accounts-autoform-admin.html', 
    'client/meteor-accounts-autoform-admin.js'],
  'client');

  api.addFiles([
    'server/methods.js'
  ],
  'server');

  api.export('kAccountsAdminFluid'  ['client', 'server']);
  api.export('kAccountsAdmin'  ['client', 'server']);
  api.export('kAccountsAdminPanelCreate'  ['client', 'server']);

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('kaoskeya:meteor-accounts-autoform-admin');
  api.addFiles('meteor-accounts-autoform-admin-tests.js');
});
