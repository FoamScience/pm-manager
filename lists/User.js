const { Text, Password, Checkbox } = require('@keystonejs/fields');

module.exports = {
  access: { 
	auth: true ,
    read: ({ authentication: { item } }) => {
      if (item.isAdmin) {
        return {}; // Don't filter any items for admins
      }
      return {
        username: item.username,
      };
    },
  },
  adminConfig: {
    defaultColumns: 'username,email,',
    defaultPageSize: 50,
    defaultSort: 'email',
    maximumPageSize: 100,
  },
  fields: {
    username: {
      type: Text,
      isRequired: true,
	  isUnique: true,
    },
    password: {
      type: Password,
      isRequired: true,
    },
	isAdmin: { type: Checkbox, defaultValue: false },
	email: {
      type: Text,
	  isUnique: true,
      // 2. Only authenticated users can read/update their own email, not any other user's.
      // Admins can read/update anyone's email.
      access: ({ existingItem, authentication: { item } }) => {
        return item.isAdmin || existingItem.id === item.id;
      },
    },
  },
  labelField: 'username',
};
