const { Text, Integer, Checkbox } = require('@keystonejs/fields');

module.exports = {
  access: { auth: true },
  adminConfig: {
    defaultColumns: 'name,phoneNumber,email',
    defaultPageSize: 50,
    defaultSort: 'name',
    maximumPageSize: 100,
  },
  fields: {
    surname: {
      type: Text,
    },
    name: {
      type: Text,
    },
	email: {
      type: Text
    },
	phoneNumber: {
	  type: Integer,
	  isRequired: true,
	  isUnique: true,
	},
  },
  labelField: 'phoneNumber',
};
