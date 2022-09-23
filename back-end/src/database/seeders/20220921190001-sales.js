"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "sales",
      [
        {
          id: 1,
          user_id: 3,
          seller_id: 2,
          total_price: 1.90,
          delivery_address: "Gondor, 100, Middle Earth",
          delivery_number: "0800-000-0000",
          sale_date: '2022-09-22 00:01:00',
          status: "Pending",
        },
        {
          id: 2,
          user_id: 3,
          seller_id: 2,
          total_price: 5.5,
          delivery_address: "Mordor, 666, Middle Earth",
          delivery_number: "0800-000-0000",
          sale_date: '2022-09-22 00:02:00',
          status: "Pending",
        },
        {
          id: 3,
          user_id: 3,
          seller_id: 2,
          total_price: 4.50,
          delivery_address: "Rohan, 1, Middle Earth",
          delivery_number: "0800-000-0000",
          sale_date: '2022-09-22 00:03:00',
          status: "Pending",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("Sales", null, {});
  },
};
