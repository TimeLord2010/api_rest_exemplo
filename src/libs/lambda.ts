import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import { formatJSONResponse } from "./apiGateway"

export const middyfy = (handler) => {
  return middy(async (event) => {
    try {
      return await handler(event)
    } catch (err) {
      if (err instanceof Error) {
        err = {
          message: err.message,
          str: err.toString()
        }
      }
      return formatJSONResponse({
        error: err,
      }, 500)
    }
  }).use(middyJsonBodyParser())
}