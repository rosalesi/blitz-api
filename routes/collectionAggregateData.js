const express = require('express');
const { getCollectionAggregateData, getCollectionAggregateDataBySymbol } = require('../dynamo/dynamoCollectionAggregateData');
let router = express.Router();

router
    .route('/')
    .get((async (req, res) => {
        try {
            const collectionAggregateData = await getCollectionAggregateData();
            res.json(collectionAggregateData);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Something went wrong"});
        }
    })
);

router
    .route('/:symbol')
    .get((async (req, res) => {
        const symbol = req.params.symbol;
        try {
            const collectionAggregateData = await getCollectionAggregateDataBySymbol(symbol);
            res.json(collectionAggregateData);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Something went wrong"});
        }
    })
);

module.exports = router;