const { Sequelize } = require('sequelize');
const dbConfig = require('./config/config.json');

const connection =  new Sequelize(dbConfig.development);

(async () => {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
        connection.sync();
      } catch (error) {
        console.error('Não consegui gravar a mensagem no banco de dados:', error);
      }
  })();

module.exports = connection;