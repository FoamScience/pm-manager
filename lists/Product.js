const { Text, Select, Integer, Checkbox } = require('@keystonejs/fields');

module.exports = {
  adminConfig: {
    defaultColumns: 'productName,quantity',
    defaultPageSize: 50,
    defaultSort: 'productName',
    maximumPageSize: 100,
  },
  fields: {
  },
  labelField: 'productName',
};
