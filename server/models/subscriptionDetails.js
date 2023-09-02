const sequelize = require("./index.js").sequelize;
const { DataTypes } = require("sequelize");

const mySubscriptionDetails = sequelize.define(
	"mySubscriptionDetails",
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
	},
	{}
);

// mySubscriptionDetails.sync({ alter: true });

module.exports = mySubscriptionDetails;
