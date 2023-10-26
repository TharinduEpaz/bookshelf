const sequelize = require('./index.js').sequelize;
const { DataTypes } = require("sequelize");

const donationRequest = sequelize.define('donationRequest', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // Add this line to generate UUIDs
    allowNull: false,
  },
  orgName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orgRegisteredNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orgTelephone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orgAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orgEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Make sure emails are unique
  },
  orgConfirmationDocument: {
    defaultValue: "uploads/documents/default.pdf",
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactPersonName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactPersonPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactPersonEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactPersonNIC: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {

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

//donationRequest.sync({  alter: true });

module.exports = donationRequest;
