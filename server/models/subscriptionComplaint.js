const sequelize = require("./index.js").sequelize;
const { DataTypes } = require("sequelize");

const subscriptionComplaint = sequelize.define(
	"subscriptionComplaint",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true, 
			primaryKey: true, 
			autoIncrement: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		
		complaint: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{}
);

// subscriptionComplaint.sync({ alter: true });

module.exports = subscriptionComplaint;