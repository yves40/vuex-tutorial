//----------------------------------------------------------------------------
//    corsutility.js
//
//    Feb 01 2019   Initial, from myenv.js
//    Feb 08 2019   Add jwt as an allowed header
//    Mar 06 2019   console.log replaced by logger
//----------------------------------------------------------------------------
const Version = "corsutility:1.14, Mar 06 2019 ";

const logger = require('./logger');

const whitelist = [
  'http://vboxweb:8088',
  'http://localhost:8088',
];

function checkOrigin(origin, callback) {
  // console.log(Version + (origin === undefined ? 'Local node': origin) + ' CORS check');
  if (origin === undefined) { // Do not want to block REST tools or server-to-server requests
    callback(null, true);
  }
  else { // origin is specified
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      logger.error(Version + (origin === null ? 'Local node': origin) + ' not allowed by CORS');
      callback(new Error('Not allowed by CORS'));
    }
  }
}
const corsOptions = {
  'origin': checkOrigin,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false,
  'optionsSuccessStatus': 204,
  'credentials': true,
  'allowedHeaders': ['Content-Type', 'Authorization', 'jwt'],
};

module.exports.getCORS = function getCORS() {
  return corsOptions;
};

module.exports.getCORSwhitelist = function getCORSwhitelist() {
  return whitelist;
};

