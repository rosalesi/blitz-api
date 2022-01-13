const express = require('express');
const collections = require('./routes/collections');
const collectionAggregateData = require('./routes/collectionAggregateData');
const index = require('./routes/index');
const cors = require('cors');

const app = express();

//Port
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

//Implement routes
app.use('/', index);
app.use('/collections', collections);
app.use('/collectionAggregateData', collectionAggregateData);

module.exports = app;