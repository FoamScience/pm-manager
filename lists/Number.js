const { Text, Integer, CalendarDay, Select, Checkbox, Relationship } = require('@keystonejs/fields');

module.exports = {
  adminConfig: {
    defaultColumns: 'productName,quantity,customer,isComplete,assignedTo,deadline,location',
    defaultPageSize: 50,
    defaultSort: 'deadline',
    maximumPageSize: 100,
  },
  labelField: 'customer',
  fields: 
  {
    productName: {
      type: Select,
	  options: 'prod-1,prod-2',
	  dataType: 'string',
	  isRequired: true,
    },
    quantity: {
      type: Integer,
	  isRequired: true,
    },
    theCustomer: {
      type: Relationship,
      isRequired: true,
	  ref: 'Customer'
    },
    isComplete: {
      type: Checkbox,
      defaultValue: false,
    },
    // added fields
    startDate: {
      type: CalendarDay,
      format: 'Do MMMM YYYY',
      yearRangeFrom: '2020',
      yearRangeTo: '2029',
      isRequired: false,
      defaultValue: new Date().toISOString('YYYY-MM-DD').substring(0, 10),
    },
    deadline: {
      type: CalendarDay,
      format: 'Do MMMM YYYY',
      yearRangeFrom: '2020',
      yearRangeTo: '2029',
      isRequired: false,
      defaultValue: new Date().toISOString('YYYY-MM-DD').substring(0, 10),
    },
	location: {
	  type: Select,
	  dataType: 'string',
	  options: "Algiers, Setif, Oran, Djelfa, Tizi Ouzou, Batna, Chlef, MSila, Bejaia, Tlemcen, Constantine, Skikda, Tiaret, Blida, Mila, Medea, Mascara, AinDefla, Biskra, Mostaganem, Relizane, Bouira, Tebessa, BordjBouArreridj, ElOued, Jijel, OumElBouaghi, Annaba, Boumerdes, Ouargla, SidiBelAbbes, Guelma, Tipaza, Khenchela, Laghouat, SoukAhras, ElTarf, Adrar, Ghardaia, AinTemouchent, Saida, ElBayadh, Tissemsilt, Bechar, Naama, Tamanrasset, Tindouf, Illizi",
	},
    assignedTo: {
      type: Relationship,
	  ref: 'User', many: true,
      isRequired: true,
    },
  },
  adminConfig:
  {
  	defaultColumns: 'phoneNumber,assignedTo,deadline,isComplete'
  },
  //access: {
  //  // 1. Only admins can read deactivated user accounts
  //	read: ({ authentication: { item } }) => {
  //	  if (item.isAdmin) {
  //	    return {}; // Don't filter any items for admins
  //	  }
  //	  // Approximately; users.filter(user => user.state !== 'deactivated');
  //	  return {
  //	    state_not: 'deactivated',
  //	  };
  //	},
  //},
};
