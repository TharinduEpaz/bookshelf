// const pool = require('pg').Pool

// const pool = new pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'test',
//     password: '',
//     port: 5432,
// })

// module.exports = pool;
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('bookshelf', 'postgres', '')

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  module.exports = { sq: sequelize, testDbConnection };