import { UserInfo } from "$/types"
import { UserIndexQuery, UserCreateBody } from "$/validators"

export type Methods = {
  get: {
    query?: UserIndexQuery
    resBody: UserInfo[]
  }
  post: {
    reqBody: UserCreateBody
    status: 201
    resBody: UserInfo
  }
}
