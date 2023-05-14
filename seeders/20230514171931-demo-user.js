const bcrypt = require('bcrypt');

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('password', 10);
    return queryInterface.bulkInsert('Users', [{
      id_num: '12340002',
      password: hash,
      first_name: 'Musashi',
      middle_name: 'Takezo',
      last_name: 'Miyamoto',
      date_of_birth: new Date(),
      email: 'user@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }

};