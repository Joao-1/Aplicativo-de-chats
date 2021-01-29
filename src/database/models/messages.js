"use strict"
const {DataTypes } = require('sequelize');
const connection = require('../index');
const User = require('./user');

const Messages = connection.define('MessagesMainChat', {
  message: DataTypes.STRING
}, {
  modelName: 'Messages',
  tableName: 'messagesmainchat'
});
User.hasMany(Messages);
Messages.belongsTo(User);

module.exports = Messages;