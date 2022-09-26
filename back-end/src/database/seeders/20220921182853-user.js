"use strict";

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          name: "Dona Coisa",
          email: "donacoisa@teste.com",
          password: "123456",
          role: "administrator",
        },
        {
          id: 2,
          name: "Entregador 1",
          email: 'entregador1@teste.com',
          password: "123456",
          role: "seller",
        },
        {
          id: 3,
          name: "Cliente 1",
          email: 'cliente1@teste.com',
          password: "123456",
          role: "customer",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
