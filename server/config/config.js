const fs = require('fs');
const path = require('path');

module.exports = {
    portUnSafe: 3227,
    portSafe: 3228,
    sslOptions: {
        key: fs.readFileSync(path.join(__dirname, 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
    }
};