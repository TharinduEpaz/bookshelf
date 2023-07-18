// const { Sequelize, DataTypes } = require('sequelize');

// const { sequelize } = require('sequelize');

//   async function main() {

//   try {
//     await db.sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

// }

// main();

const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const User = sequelize.define('User', {
  // Model attributes are defined here 
  id : {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull:false
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailVerified : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
    }, 
 
}, {
  // Other model options go here
    
})

// User.sync({  alter: true });

module.exports = User;











