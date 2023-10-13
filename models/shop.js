"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Shop.hasMany(models.Shop, {
      //   foreignKey: {
      //     name: "userId",
      //     allowNull: false,
      //   },
      // });
      // Shop.belongsTo(models.Product, {
      //   foreignKey: {
      //     name: "productId",
      //     allowNull: false,
      //   },
      // });
    }
  }
  Shop.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Shop",
    }
  );
  return Shop;
};
