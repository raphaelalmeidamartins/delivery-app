'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: 1,
          name: "Coca-Cola",
          price: 5.50,
          url_image: "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/2609/image-not-found.jpg",
        },
        {
          id: 2,
          name: "Glacial",
          price: 1.90,
          url_image: "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/2609/image-not-found.jpg",
        },
        {
          id: 3,
          name: "Amendoim Japonês",
          price: 4.50,
          url_image: "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/2609/image-not-found.jpg",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  },
};
