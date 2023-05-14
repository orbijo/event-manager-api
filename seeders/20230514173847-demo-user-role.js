module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('User_Roles', [{
      RoleId: 3,
      UserId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User_Roles', null, {});
  }

};