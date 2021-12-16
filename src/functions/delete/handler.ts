import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { deleteUser } from '@libs/dynamo';
import { middyfy } from '@libs/lambda';
import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const result = await deleteUser(event.body.name)
  return formatJSONResponse({
    'message': 'user deleted',
    ...result
  });
}

export const main = middyfy(hello);