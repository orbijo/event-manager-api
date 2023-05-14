module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('User_Roles', [{
      RoleId: 2,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User_Roles', null, {});
  }

};