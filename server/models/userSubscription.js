const sequelize = require("./index.js").sequelize;
const { DataTypes } = require("sequelize");


const userSubscription = sequelize.define(
	"userSubscription",
	{
		// Model attributes are defined here
		
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
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

// userSubscription.sync({ force: true });

module.exports = userSubscription;