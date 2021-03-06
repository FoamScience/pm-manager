const { Text, Integer, CalendarDay, Select, Checkbox, Relationship } = require('@keystonejs/fields');

module.exports = {
  access: {
	auth: true,
	read: ({ authentication: { item } }) => {
      if (item.isAdmin || item.isLauncher) {
        return {}; // Don't filter any items for admins
      }
      return {
        //assignedTo: item,
		location: item.location,
      };
    },
	create: ({ authentication: { item } }) => {
      if (item.isAdmin || item.isLauncher) {
        return true; // Don't filter any items for admins
      }
      return false;
    },
  },
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
      //type: Select,
	  //options: 'prod-1,prod-2',
	  //dataType: 'string',
      type: Relationship,
	  ref: 'Product',
	  isRequired: true,
    },
    quantity: {
      type: Integer,
	  isRequired: true,
    },
    theCustomer: {
      type: Relationship,
      isRequired: true,
	  ref: 'Customer',
	  index: true,
	  access: {
        update: ({ existingItem, authentication: { item } }) => {
          return item.isAdmin;
        },
	  }
    },
    status: {
      //type: Checkbox,
      //defaultValue: false,
	  type: Select,
	  dataType: 'string',
	  isRequired: true,
	  options: "done,waiting,problems",
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
	  access: true,
      type: Relationship,
	  ref: 'User',
      isRequired: true,
    },
  }
};
