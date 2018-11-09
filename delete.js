import * as dynamoBbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const params = {
    TableName: 'notes',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoBbLib.call('delete', params);
    console.info('Deleted Item =>', result);
    return success({ status: true });
  } catch (error) {
    console.error('DELETE ERROR =>', error);
    return failure({ status: false });
  }
}
