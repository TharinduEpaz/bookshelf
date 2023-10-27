const sequelize = require("./index.js").sequelize;
const { DataTypes } = require("sequelize");

const order = sequelize.define(
	"order",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		orderDate: {
			type: DataTypes.DATE,
			defaultValue: sequelize.NOW,
			allowNull: false,
		},
		orderStatus: {
			type: DataTypes.STRING,
			defaultValue: "pending",
			allowNull: false,
		},
		totalPrice: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		isPaid: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		orderItems: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		address : {
			type:DataTypes.JSON,
			allowNull:true,

		},
		phone:{
			type:DataTypes.STRING,
			allowNull:true,
			
		}

		
	},
	{
		// Other model options go here
	}
);
// order.sync({ force: true })

module.exports = order;
