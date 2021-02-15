const DECIMAL_NUMBER_RADIX = 10;

function normalizeInt(text, defaultValue) {
  return text && !Number.isNaN(Number(text)) ? parseInt(text, DECIMAL_NUMBER_RADIX) : defaultValue;
}

const config = {
  default: {
    username: process.env.DB_USERNAME || 'linkme_service_dev',
    password: process.env.DB_PASSWORD || 'linkme_service_dev',
    database: process.env.DB_DATABASE || 'linkme_service_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '4001',
    dialect: process.env.DB_CONNECTION || 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
    logging: process.env.SQL_LOGGING_ENABLED === 'true' ? console.log : false,
    define: {
      underscored: true
    },
    pool: {
      max: normalizeInt(process.env.DB_CONNECTION_POOL_MAX_CONNECTIONS, 5),
      min: normalizeInt(process.env.DB_CONNECTION_POOL_MIN_CONNECTIONS, 0)
    }
  },
  test: {
    username: process.env.TEST_DB_USERNAME || 'linkme_service_test',
    password: process.env.TEST_DB_PASSWORD || 'linkme_service_test',
    database: process.env.TEST_DB_DATABASE || 'linkme_service_test',
    host: process.env.TEST_DB_HOST || '127.0.0.1',
    port: process.env.TEST_DB_PORT || '4001',
    dialect: process.env.TEST_DB_CONNECTION || 'mysql',
    define: {
      underscored: true
    },
    logging: process.env.SQL_LOGGING_ENABLED === 'true' ? console.log : false,
    benchmark: process.env.SQL_LOGGING_ENABLED === 'true',
    dialectOptions: {
      decimalNumbers: true,
      multipleStatements: true
    }
  }
};

module.exports = ((config[process.env.NODE_ENV] && config[process.env.NODE_ENV]) || config.default);
