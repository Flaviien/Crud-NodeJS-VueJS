const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/item');
const userRoutes = require('./routes/user');
const path = require('path');
const dbConnexion = require('./db')

mongoose.connect(dbConnexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', itemRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;