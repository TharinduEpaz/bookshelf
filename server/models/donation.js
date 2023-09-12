const sequelize = require('./index.js').sequelize;
const { DataTypes } = require("sequelize");

const donationRequest = sequelize.define('donationRequest', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // Add this line to generate UUIDs
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Make sure emails are unique
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // You can define more options here if needed
});

// Define associations if you have any, e.g., donationRequest.belongsTo(...)

// Sync the model with the database
// (async () => {
//   try {
//     await donationRequest.sync({ alter: true });
//     console.log('donationRequest model synced successfully.');
//   } catch (error) {
//     console.error('Error syncing donationRequest model:', error);
//   }
// })();

module.exports = donationRequest;
