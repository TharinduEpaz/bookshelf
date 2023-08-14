const sequelize = require("./index.js").sequelize;
const { DataTypes } = require("sequelize");

const userSubcription = sequelize.define(
	"userSubcription",
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,

		}, 
		type: {
			type: DataTypes.STRING,
			allowNull:false
		}
	},
	{}
);

 //userSubcription.sync({ alter: true });

module.exports = userSubcription;
