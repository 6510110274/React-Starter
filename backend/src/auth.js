const axios = require('axios');
const jwt = require('jsonwebtoken');
const appConfig = require('./config');

let public_key =  null

async function initSsoCert(){
  const result = await axios.get(appConfig.ssoIssuer)  
  public_key = `-----BEGIN PUBLIC KEY-----\n${result.data.public_key}\n-----END PUBLIC KEY-----\n`
  //console.log(public_key)  
}

async function verifyJwt(token) {  
  if (appConfig.isDev && token.startsWith('DEV::')) {
    const items = token.split('::');
    const data = {
      preferred_username: items[1],
      groups: ['student']
    };
    if (items.length >= 3 && items[2] == '1') {
      data.groups.push('staff');
    }
    return data;
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, public_key, { issuer: appConfig.ssoIssuer, algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

const BEARER_PREFIX = 'Bearer ';
async function authMiddleware(req, res, next) {
  const bearer = req.headers['authorization'];
  if (bearer?.startsWith(BEARER_PREFIX)) {
    const token = bearer.substring(BEARER_PREFIX.length);
    try {
      const decoded = await verifyJwt(token);
      req.authData = {
        username: decoded.preferred_username,
        isStaff: (decoded.groups || []).includes('staff'),
      };
      return next();
    } catch (err) {
      console.error('JWT verification error:', err);
      return res.status(401).send('Invalid token');
    }
  }
  return res.status(401).send('Authorization header missing or invalid');
}

module.exports = {
  verifyJwt,
  authMiddleware,
  initSsoCert
};