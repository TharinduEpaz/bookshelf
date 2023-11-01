
const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");
const validator = require('validator');

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
        allowNull: true
    },
    email : {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate : {
            isEmail : {
                msg : 'Please enter a valid email',
                validator : validator.isEmail
            }
        }
        
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
    role : {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'buyer'
    },
    verificationToken : {
        type: DataTypes.STRING,
        allowNull: true
    },
  
 
}, {
  // Other model options go here
    
})


// User.sync({  alter: true });



module.exports = User;











