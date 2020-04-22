const { Text, Decimal, CalendarDay, Select, Checkbox, Relationship } = require('@keystonejs/fields');

//const AlgeriaStates = [
//	{ value: 'Algiers' },
//	{ value: 'Sétif' },
//	{ value: 'Oran' },
//	{ value: 'Djelfa' },
//	{ value: 'Tizi Ouzou' },
//	{ value: 'Batna' },
//	{ value: 'Chlef' },
//	{ value: "M'Sila" },
//	{ value: 'Béjaïa' },
//	{ value: 'Tlemcen' },
//	{ value: 'Constantine' },
//	{ value: 'Skikda' },
//	{ value: 'Tiaret' },
//	{ value: 'Blida' },
//	{ value: 'Mila' },
//	{ value: 'Médéa' },
//	{ value: 'Mascara' },
//	{ value: 'Aïn Defla' },
//	{ value: 'Biskra' },
//	{ value: 'Mostaganem' },
//	{ value: 'Relizane' },
//	{ value: 'Bouira' },
//	{ value: 'Tébessa' },
//	{ value: 'Bordj Bou Arreridj' },
//	{ value: 'El Oued' },
//	{ value: 'Jijel' },
//	{ value: 'Oum El Bouaghi' },
//	{ value: 'Annaba' },
//	{ value: 'Boumerdès' },
//	{ value: 'Ouargla' },
//	{ value: 'Sidi Bel Abbès' },
//	{ value: 'Guelma' },
//	{ value: 'Tipaza' },
//	{ value: 'Khenchela' },
//	{ value: 'Laghouat' },
//	{ value: 'Souk Ahras' },
//	{ value: 'El Tarf' },
//	{ value: 'Adrar' },
//	{ value: 'Ghardaïa' },
//	{ value: 'Aïn Témouchent' },
//	{ value: 'Saïda' },
//	{ value: 'El Bayadh' },
//	{ value: 'Tissemsilt' },
//	{ value: 'Béchar' },
//	{ value: 'Naâma' },
//	{ value: 'Tamanrasset' },
//	{ value: 'Tindouf' },
//	{ value: 'Illizi' }
//];


module.exports = {
  adminConfig: {
    defaultColumns: 'phoneNumber,isComplete,assignedTo,deadline,location',
    defaultPageSize: 50,
    defaultSort: 'email',
    maximumPageSize: 100,
  },
  labelField: 'phoneNumber',
  fields: 
  {
    // existing fields
    phoneNumber: {
      type: Decimal,
      isRequired: true,
	  isUnique: true
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
	  ref: 'User', many: true, selectBy: 'User.username',
      isRequired: true,
    },
  },
  adminConfig:
  {
  	defaultColumns: 'phoneNumber,assignedTo,deadline,isComplete'
  },
  access: {
    // 1. Only admins can read deactivated user accounts
  	read: ({ authentication: { item } }) => {
  	  if (item.isAdmin) {
  	    return {}; // Don't filter any items for admins
  	  }
  	  // Approximately; users.filter(user => user.state !== 'deactivated');
  	  return {
  	    state_not: 'deactivated',
  	  };
  	},
  },
};
