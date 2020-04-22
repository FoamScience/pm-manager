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
  adapter: new KnexAdaptera(
	  {
		  connection:'postgres://krfnloxdczscau:25f41dcb459a83b915d9cb3ee24b2591063e0aae7053ed24b3121d577430d631@ec2-34-193-232-231.compute-1.amazonaws.com:5432/algeria-pm-manager'
	  }
  ),
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
    new AdminUIApp({ /*authStrategy,*/ enableDefaultRoute: true }),
  ]
};
