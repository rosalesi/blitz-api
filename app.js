const express = require('express');
const collections = require('./routes/collections');
const collectionAggregateData = require('./routes/collectionAggregateData');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/collections', collections);
app.use('/collectionAggregateData', collectionAggregateData);


app.get('/', (req, res) => {
    res.send('Welcome to the blitz-api');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});