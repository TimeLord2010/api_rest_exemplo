import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { insertUser, getUser } from '@libs/dynamo';
import { middyfy } from '@libs/lambda';
import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const oldItem = await getUser(event.body.name)
  if (oldItem != null) {
    throw new Error('User already exists.')
  }
  const result = await insertUser(event.body)
  return formatJSONResponse({
    'message': 'user created',
    ...result
  });
}

export const main = middyfy(hello);