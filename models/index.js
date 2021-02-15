const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const logger = require('../core/libs/logger');

const config = require('../config/database');

const basename = path.basename(__filename);

const db = {};

const namespace = cls.createNamespace('linkme-service');

Sequelize.useCLS(namespace);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.transaction = (task) => {
  logger.info('Transaction has started');
  return namespace.get('transaction') ? task() : sequelize.transaction(task);
};

module.exports = db;
