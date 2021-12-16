import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { updateUser } from '@libs/dynamo';
import { middyfy } from '@libs/lambda';
import schema from './schema';

function isStringArray (obj: any[] | undefined) : obj is string[] {
    if (obj == null) return false
    for (const item of obj) {
        if (typeof item != 'string') {
            return false
        }
    }
    return true
}

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const { name, addProps, removeProps } = event.body
    if (isStringArray(removeProps)) {
        await updateUser(name, addProps ?? {}, removeProps ?? [])
    } else {
        throw new Error('removeProps needs to be a array of strings.')
    }
  return formatJSONResponse({
    'message': 'updated user',
  });
}

export const main = middyfy(hello);