import AWS from 'aws-sdk';

export function call(action, params) {
  // If Dynamo is in a diff region, please update via
  // AWS.config.update({region: "dynamo-region"})
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb[action](params).promise();
}
