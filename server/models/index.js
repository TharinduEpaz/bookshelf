const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('', '', '', {
  host: '',
  dialect:  'postgres',
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
    }
  }
})

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  module.exports = { sequelize, testDbConnection };
