const sequelize = require("./index.js").sequelize;
const { DataTypes } = require("sequelize");

const donationPacks = sequelize.define(
	"donationPacks",
	{
		// Model attributes are defined here
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: sequelize.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        donationItems: {
            type: DataTypes.JSON,
            allowNull: false,
        },
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: "uploads/default.jpeg",
		},
	},
	{
		// Other model options go here
	}
);

// donationPacks.sync({  force: true });

module.exports = donationPacks;