require('dotenv/config');
const jwt = require('jsonwebtoken');

const JWT_KEY_PATH = require('path').resolve(__dirname, '../../jwt.evaluation.key');

const JWT_SECRET = require('fs').readFileSync(JWT_KEY_PATH, { encoding: 'utf-8' });

const JWT_CONFIG = { expiresIn: '5d', algorithm: 'HS256' };

const configAuthorization = {
  signAuth: (user) => jwt.sign({ data: { user } }, JWT_SECRET, JWT_CONFIG),
  verifyAuth: (token) => jwt.verify(token.split(' ')[1], JWT_SECRET),
};

module.exports = {
  configAuthorization,
};
