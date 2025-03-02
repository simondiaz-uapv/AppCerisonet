// fichier qui répertorie les modules nécessaires pour le bon fonctionnement de l'application
const express = require('express');
const path = require('path');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const logger = require('./middlewares/logger');
const session = require('express-session');
const { MongoDBStore } = require('connect-mongodb-session');
const app = express();

const root = path.join(__dirname, '../AppCerisonet/dist/app-cerisonet/browser');

app.use(express.json());
app.use(express.static(root));
app.use(logger);

const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/session',
    collection: 'mySessions',
    touchAfter: 24 * 3600
})

// Configuration des sessions
app.use(session({
    secret: 'GIBBS', 
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: true } 
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(root, 'index.html'));
});

app.use(authRoutes);

module.exports = app;