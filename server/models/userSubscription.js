const sequelize = require("./index.js").sequelize;
const { DataTypes } = require("sequelize");


const userSubscription = sequelize.define(
	"userSubscription",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		subscriptionType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
	}
);

// userSubscription.sync({ alter: true });

module.exports = userSubscription;