const { Text, Password, Checkbox, Select } = require('@keystonejs/fields');

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
	isAdmin: { 
	  type: Checkbox, 
	  defaultValue: false,
	  access: {
        update: ({ existingItem, authentication: { item } }) => {
          return item.isAdmin;
        },
	  }
	},
	isLauncher: { 
	  type: Checkbox, 
	  defaultValue: false,
	  access: {
        update: ({ existingItem, authentication: { item } }) => {
          return item.isAdmin;
        },
	  }
	},
	isDeliveryMan: { 
	  type: Checkbox, 
	  defaultValue: false,
	  access: {
        update: ({ existingItem, authentication: { item } }) => {
          return item.isAdmin;
        },
	  }
	},
    location: {
      type: Select,
      dataType: 'string',
      options: "Algiers, Setif, Oran, Djelfa, Tizi Ouzou, Batna, Chlef, MSila, Bejaia, Tlemcen, Constantine, Skikda, Tiaret, Blida, Mila, Medea, Mascara, AinDefla, Biskra, Mostaganem, Relizane, Bouira, Tebessa, BordjBouArreridj, ElOued, Jijel, OumElBouaghi, Annaba, Boumerdes, Ouargla, SidiBelAbbes, Guelma, Tipaza, Khenchela, Laghouat, SoukAhras, ElTarf, Adrar, Ghardaia, AinTemouchent, Saida, ElBayadh, Tissemsilt, Bechar, Naama, Tamanrasset, Tindouf, Illizi",
	  access: {
        update: ({ existingItem, authentication: { item } }) => {
          return item.isAdmin;
        },
	  }
    },
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
