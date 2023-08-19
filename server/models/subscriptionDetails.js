const sequelize = require("./index.js").sequelize;
const { DataTypes } = require("sequelize");

const details = sequelize.define(
	"details",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		subscriptionType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		subscriptionDetails: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{}
);

// details.sync({ alter: true });

module.exports = details;
