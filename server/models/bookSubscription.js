const sequelize = require("./index.js").sequelize;
const { DataTypes } = require("sequelize");

const bookSubscription = sequelize.define("bookSubscription", {
	// Model attributes are defined here
	
});

// bookSubscription.sync({  force: true });

module.exports = bookSubscription;
