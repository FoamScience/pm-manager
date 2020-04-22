const { Keystone } = require('@keystonejs/keystone');
const { KnexAdapter } = require('@keystonejs/adapter-knex');
const { Text, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const TodoSchema = require('./lists/Todo.js');
const UserSchema = require('./lists/User.js');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');


const keystone = new Keystone({
  name: 'Phone Book Manager',
  adapter: new KnexAdapter(),
  appVersion: {
    version: '0.0.1',
    addVersionToHttpHeaders: true,
    access: true,
  },
});

//keystone.createList('Todo', TodoSchema);
Numbers = keystone.createList ( 'Number', TodoSchema);
Users = keystone.createList('User', UserSchema);


const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'username', // default: 'email'
    secretField: 'password', // default: 'password'
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    //new StaticApp({ path: '/', src: 'public' , authStrategy}),
    // Setup the optional Admin UI
    new AdminUIApp({ authStrategy, enableDefaultRoute: true }),
  ]
};
