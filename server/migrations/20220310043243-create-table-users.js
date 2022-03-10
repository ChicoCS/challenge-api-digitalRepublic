"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        queryInterface.createTable("users", {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
          },
          uid: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            allowNull: false,
          },
          name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          cpf: {
            type: Sequelize.DataTypes.STRING(11),
            allowNull: false,
          },
        });
      });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
