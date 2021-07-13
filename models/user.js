'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: "email cannot be empty field"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: "password cannot be empty field"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(user){
        user.password = hashPassword(user.password)
        user.role = 'customer'
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};