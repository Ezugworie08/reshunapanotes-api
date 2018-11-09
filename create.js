import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'notes',
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  try {
    // const newNote = await dynamoDbLib.call('put', params);
    // console.info('New Note =>', newNote);
    // return success(newNote);
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (error) {
    console.error('Error =>', error);
    return failure({ status: false });
  }
}
