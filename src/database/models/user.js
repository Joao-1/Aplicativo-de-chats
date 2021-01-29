"use strict"
const {DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const connection = require('../index');

const User = connection.define('User', {
  nick: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    set(value) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hash);
    }
  },
  email: DataTypes.STRING,
},{
  modelName: 'User',
}
);

module.exports = User;