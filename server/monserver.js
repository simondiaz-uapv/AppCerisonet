const https = require('https');
const http = require('http');
const app = require('./app');
const config = require('./config/config');

const ecouteUnSafe = http.createServer(app).listen(config.portUnSafe, () => {
    console.log(`HTTP server listening on port ${config.portUnSafe}`);
});

const ecouteSafe = https.createServer(config.sslOptions, app).listen(config.portSafe, () => {
    console.log(`HTTPS server listening on port ${config.portSafe}`);
});