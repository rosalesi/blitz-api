const express = require('express');
const { getCollectionAggregateData, getCollectionAggregateDataBySymbol } = require('./dynamoCollectionAggregateData');
const { getCollections, getCollectionBySymbol, addOrUpdateCollection, deleteCollection } = require('./dynamoCollections');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the blitz-api');
});

app.get('/collections', async (req, res) => {
    try {
        const collections = await getCollections();
        res.json(collections);
    } catch (error) {
        console.error(error);
        res.status(500).json({err: "Something went wrong"});
    }
});

app.get('/collections/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const collections = await getCollectionBySymbol(symbol);
        res.json(collections);
    } catch (error) {
        console.error(error);
        res.status(500).json({err: "Something went wrong"});
    }
});

app.post('/collections', async (req, res) => {
    const collection = req.body;
    try {
        const newCollection = await addOrUpdateCollection(collection);
        res.json(newCollection);
    } catch (error) {
        console.error(error);
        res.status(500).json({err: "Something went wrong"});
    }
});

app.put('/collections/:symbol', async (req, res) => {
    const collection = req.body;
    const {symbol} = req.params;
    collection.symbol = symbol;
    try {
        const updatedCollection = await addOrUpdateCollection(collection);
        res.json(updatedCollection);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
});

app.delete('/collections/:symbol', async (req, res) => {
    const {symbol} = req.params;
    try {
        res.json(await deleteCollection(symbol));
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Something went wrong'});
    }
});



//Aggregate data
app.get('/collectionAggregateData', async (req, res) => {
    try {
        const collectionAggregateData = await getCollectionAggregateData();
        res.json(collectionAggregateData);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
});

app.get('/collectionAggregateData/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    try {
        const collectionAggregateData = await getCollectionAggregateDataBySymbol(symbol);
        res.json(collectionAggregateData);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Something went wrong"});
    }
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});