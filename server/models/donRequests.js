const sequelize = require("./index.js").sequelize;
const {
    DataTypes
} = require("sequelize");

const donRequests = sequelize.define(
    "donRequests", {
        // Model attributes are defined here
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize.UUIDV4,
        },
        orgName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        orgRegisteredNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        requestedItems: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        approval: {
            type: DataTypes.STRING,
            defaultValue: "Pending",
        },
        seen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        // Other model options go here
    }
);

//donRequests.sync({  force: true });

module.exports = donRequests;