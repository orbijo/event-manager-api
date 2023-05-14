module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Roles', [{
      title: 'APPROVER',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }

};