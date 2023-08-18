const sequelize = require('./index.js').sequelize
const { DataTypes } = require("sequelize");

const subscription = sequelize.define(
	"subscription",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		LastName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		book_count: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		time_period: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{}
);

// subscription.sync({ alter: true });


module.exports = subscription;