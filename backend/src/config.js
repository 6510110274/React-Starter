const dbConnectionInfo = require('./db-conn.json');

const isProd = process.env.NODE_ENV == 'production';
let appConfig = {
  isProd,
  isDev: !isProd,
  clearDataBeforeLodingFixture: isProd ? false : true,
  dbConnectionInfo,
  ssoIssuer: 'http://localhost:8888/realms/master',
};

module.exports = appConfig;