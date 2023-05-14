const bcrypt = require('bcrypt');

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('password', 10);
    return queryInterface.bulkInsert('Users', [{
      id_num: '12340000',
      password: hash,
      first_name: 'Julius',
      middle_name: 'Gaius',
      last_name: 'Caesar',
      date_of_birth: new Date(),
      email: 'admin@admin.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }

};