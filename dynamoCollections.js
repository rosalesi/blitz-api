const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyID: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "blitz-api";


const getCollections = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const collections = await dynamoClient.scan(params).promise();
    return collections;
};

const getCollectionBySymbol = async (symbol) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            symbol
        }
    };
    return await dynamoClient.get(params).promise();
};

const addOrUpdateCollection = async (collection) => {
    const params = {
        TableName: TABLE_NAME,
        Item: collection
    };
    return await dynamoClient.put(params).promise();
};

const deleteCollection = async (symbol) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            symbol
        }
    };
    return await dynamoClient.delete(params).promise();
};

module.exports = {
    dynamoClient,
    getCollections,
    getCollectionBySymbol,
    addOrUpdateCollection,
    deleteCollection
}