import type { GetAPIEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { getUser } from '@libs/dynamo';
import { middyfy } from '@libs/lambda';

const hello: GetAPIEvent = async (event) => {
    const { name } = event.queryStringParameters ?? {}
    if (name == null) {
        throw new Error('name was null.')
    }
  const result = await getUser(name)
  return formatJSONResponse({
    ...result
  });
}

export const main = middyfy(hello);