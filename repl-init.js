/*
  A console for the application.
  CAUTION: Very experimental.

  Usage: `npm run console`

  - models are available within `db` variable.
 */

const repl = require('repl');
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');

const db = require('./models');

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env-local' });

const { sequelize: { models } } = db;

Object.keys(models).forEach((modelName) => {
  global[modelName] = models[modelName];
});

const replServer = repl.start({
  prompt: 'console > ',
});

replServer.context.db = models;
