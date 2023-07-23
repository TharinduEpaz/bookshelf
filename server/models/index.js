const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('neondb', '2020cs050', 'WZiRGvC9PT5l', {
  host: 'ep-long-grass-811666.us-east-2.aws.neon.tech',
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

  //postgres://2020cs050:WZiRGvC9PT5l@ep-long-grass-811666.us-east-2.aws.neon.tech/neondb