require('dotenv/config');
require('express-async-errors');
const server = require('express')();
const app = require('./app');

const port = process.env.PORT || 3001;

server.use('/v1', app);
server.listen(port);

console.log(`It's live on port ${port}`);