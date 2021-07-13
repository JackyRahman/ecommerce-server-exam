'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart)
    }
  };
  Product.init({
    name: DataTypes.STRING,
    image_url: DataTypes.TEXT,
    price: {
      type: DataTypes.INTEGER,
      validate:{
        min:{
          args:[0],
          msg:"price can't be lower than 0"
        },
        isInt: {
          msg: "Must be an number of price"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate:{
        min:{
          args:[0],
          msg:"stock can't be lower than 0"
        },
        isInt: {
          msg: "Must be an number of stock"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};