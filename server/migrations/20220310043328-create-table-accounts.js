"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        queryInterface.createTable("accounts", {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
          uid: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
            allowNull: false,
          },
          value: {
            type: Sequelize.DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
            allowNull: false,
          },
          user_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id'
            },
          },
        });
      });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("accounts");
  },
};
