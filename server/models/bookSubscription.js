const sequelize = require("./index.js").sequelize;
const { DataTypes } = require("sequelize");

const bookSubscription = sequelize.define("bookSubscription", {
	// Model attributes are defined here
	userId: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: sequelize.UUIDV4,
	},

	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: sequelize.UUIDV4,
	},
});

//bookSubscription.sync({  alter: true });

module.exports = bookSubscription;
