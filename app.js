const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./router/user');
const SaucesRouter = require('./router/user');

const app = express();
mongoose.connect('mongodb+srv://Aurelien:Trivium31880@cluster0.4sngw.mongodb.net/piiquante?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());

app.use('/api/auth', UserRouter);
app.use('/api/sauces', SaucesRouter);

module.exports = app;