const axios = require('axios');
const {addOrUpdateCollection} = require('./dynamo/dynamoCollections');
const {addOrUpdateCollectionAggregateData} = require('./dynamo/dynamoCollectionAggregateData');
const AWS = require('aws-sdk');

const seedAggregateData = async () => {
    const url = 'https://api-mainnet.magiceden.io/rpc/getAggregatedCollectionMetrics/';
    try {
        const { data : collections } = await axios.get(url);

        const collectionPromises = collections.results.map((collection) => {
            addOrUpdateCollectionAggregateData({ ... collection});
        });
        await Promise.all(collectionPromises);
    } catch (error) {
        console.error(error);
        console.log("Not today pal");
    }
};

const seedData = async () => {
    const url = 'https://api-mainnet.magiceden.io/all_collections';
    try {
        const { data : collections } = await axios.get(url);
        console.log(collections);

        const collectionPromises = collections.collections.map((collection) => {
            addOrUpdateCollection({ ... collection });
        });
        console.log(collectionPromises);
        await Promise.all(collectionPromises);
        
    } catch (error) {
        console.error(error);
        console.log("Not today pal");
    };
};

//seedAggregateData();
seedData();