const { Keystone } = require('@keystonejs/keystone');
//const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
const { KnexAdapter } = require('@keystonejs/adapter-knex');
const { Text, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const UserSchema = require('./lists/User.js');
const CustomerSchema = require('./lists/Customer.js');
const NumberSchema = require('./lists/Number.js');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');


const keystone = new Keystone({
  name: 'Phone Book Manager',
  adapter: new KnexAdapter({
	  dropDatabase: true,
	  knexOptions: {
		  client: 'mysql',
		  connection: 'mysql://kwxt4yty4nq99opc:hmknfkqxymkow80g@qbct6vwi8q648mrn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/pheaj0w559hd45qv'
		  /*pool: {
			min: 5,
			max: 20,
		  },*/
	  }
  }),
  appVersion: {
    version: '0.0.1',
    addVersionToHttpHeaders: true,
    access: true,
  },
});

//keystone.createList('Todo', TodoSchema);
Customers = keystone.createList('Customer', CustomerSchema);
Users = keystone.createList('User', UserSchema);
Numbers = keystone.createList ( 'Number', NumberSchema);


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
