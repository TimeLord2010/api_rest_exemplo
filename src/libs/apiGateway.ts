import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

export type GetAPIEvent = Handler<Omit<APIGatewayProxyEvent, 'body'>, APIGatewayProxyResult>
type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>, code: number = 200) => {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(response)
  }
}
