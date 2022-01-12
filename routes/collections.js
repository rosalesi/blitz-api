const express = require('express');
const { getCollections, getCollectionBySymbol, addOrUpdateCollection, deleteCollection } = require('../dynamo/dynamoCollections');
let router = express.Router();

router
    .route('/')
    .get((async (req, res) => {
        try {
            const collections = await getCollections();
            res.json(collections);
        } catch (error) {
            console.error(error);
            res.status(500).json({err: "Something went wrong"});
        }
    }))
    .post((async (req, res) => {
        const collection = req.body;
        try {
            const newCollection = await addOrUpdateCollection(collection);
            res.json(newCollection);
        } catch (error) {
            console.error(error);
            res.status(500).json({err: "Something went wrong"});
        }
    })
);


router
    .route('/:symbol')
    .get((async (req, res) => {
        const symbol = req.params.symbol;
        try {
            const collections = await getCollectionBySymbol(symbol);
            res.json(collections);
        } catch (error) {
            console.error(error);
            res.status(500).json({err: "Something went wrong"});
        }
    }))
    .put((async (req, res) => {
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
    }))
    .delete((async (req, res) => {
        const {symbol} = req.params;
        try {
            res.json(await deleteCollection(symbol));
        } catch (error) {
            console.error(error)
            res.status(500).json({error: 'Something went wrong'});
        }
    })
);

module.exports = router;