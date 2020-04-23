const { Keystone } = require('@keystonejs/keystone');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');
//const { KnexAdapter } = require('@keystonejs/adapter-knex');
const { Text, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');

const UserSchema = require('./lists/User.js');
const CustomerSchema = require('./lists/Customer.js');
const NumberSchema = require('./lists/Number.js');
const { GoogleAuthStrategy } = require('@keystonejs/auth-passport');


const keystone = new Keystone({
  name: 'Phone Book Manager',
  adapter: new MongooseAdapter(),
  // MONGO_URI = "mongodb+srv://taher-nacer:f4ssJxmyr6JPVG4T@pm-manager-lsi8u.gcp.mongodb.net/test?retryWrites=true&w=majority"
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


//const authStrategy = keystone.createAuthStrategy({
//  type: PasswordAuthStrategy,
//  list: 'User',
//  config: {
//    identityField: 'username', // default: 'email'
//    secretField: 'password', // default: 'password'
//  },
//});

const googleStrategy = keystone.createAuthStrategy({
  type: GoogleAuthStrategy,
  list: 'User',
  config: {
    idField: 'googleId',
    appId: '1082645233483-lvrl0ihtob9ov5lhbnnq1p3dhbtt2vb7.apps.googleusercontent.com',
    appSecret: 'tWz146cXoZzKCJBMfC3iaADt',
    loginPath: '/auth/google',
    callbackPath: '/auth/google/callback',
    // Once a user is found/created and successfully matched to the
    // googleId, they are authenticated, and the token is returned here.
    // NOTE: By default Keystone sets a `keystone.sid` which authenticates the
    // user for the API domain. If you want to authenticate via another domain,
    // you must pass the `token` as a Bearer Token to GraphQL requests.
    onAuthenticated: ({ token, item, isNewItem }, req, res) => {
      console.log(token);
      res.redirect('/');
    },
    // If there was an error during any of the authentication flow, this
    // callback is executed
    onError: (error, req, res) => {
      console.error(error);
      res.redirect('/?error=Uh-oh');
    },
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    //new StaticApp({ path: '/', src: 'public' }),
    // Setup the optional Admin UI
    new AdminUIApp({ googleStrategy, enableDefaultRoute: true }),
  ]
};
