const bcrypt = require('bcrypt');

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('password', 10);
    return queryInterface.bulkInsert('Users', [{
      id_num: '12340001',
      password: hash,
      first_name: 'Alan',
      middle_name: 'Mathison',
      last_name: 'Turing',
      date_of_birth: new Date(),
      email: 'organizer@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }

};