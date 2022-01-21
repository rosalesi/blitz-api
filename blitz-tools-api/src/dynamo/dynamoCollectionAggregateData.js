const AWS = require('aws-sdk');
require('dotenv').config({path:__dirname+'/./../../.env'})

AWS.config.update({
    region: 'us-east-2',
    accessKeyID: 'AKIAZXGYCC75U2WSPWHA',
    secretAccessKey: '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'
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "collectionAggregateData";


const getCollectionAggregateData = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const collections = await dynamoClient.scan(params).promise();
    return collections;
};

const getCollectionAggregateDataBySymbol = async (symbol) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            symbol
        }
    };
    return await dynamoClient.get(params).promise();
};

const addOrUpdateCollectionAggregateData = async (collection) => {
    const params = {
        TableName: TABLE_NAME,
        Item: collection
    };
    return await dynamoClient.put(params).promise();
};

const deleteCollectionAggregateData = async (symbol) => {
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
    getCollectionAggregateData,
    getCollectionAggregateDataBySymbol,
    addOrUpdateCollectionAggregateData,
    deleteCollectionAggregateData
}