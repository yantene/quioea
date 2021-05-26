import { UserInfoFull } from "$/types"
import { SessionCreateBody } from "$/validators"

export type Methods = {
  get: {
    reqHeaders: { cookie: string }
    resBody: UserInfoFull
  }
  put: {
    reqBody: SessionCreateBody
    status: 201
    resBody: UserInfoFull
    resHeaders: { "Set-Cookie": string }
  }
  delete: {
    status: 204
  }
}
