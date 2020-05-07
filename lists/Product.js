const { Text, Select, Integer, Checkbox } = require('@keystonejs/fields');

module.exports = {
  access: { 
	auth: true ,
  },
  adminConfig: {
    defaultColumns: 'productName',
    defaultPageSize: 50,
    defaultSort: 'productName',
    maximumPageSize: 100,
  },
  fields: {
    productName: {
      type: Text,
	  index: true,
      isRequired: true,
	  isUnique: true,
    },
  },
  labelField: 'productName',
};
