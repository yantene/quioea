import {
  createUser,
  getUsers,
  toUserInfo,
  toUserInfoFull,
} from "$/service/user"
import { defineController } from "./$relay"

export default defineController(() => ({
  get: async ({ query }) => {
    const users = await getUsers(
      {
        userIds: query?.userIds,
        userNames: query?.userNames,
      },
      query?.limit,
      query?.offset,
    )

    const userInfos = users.map(toUserInfo)

    return {
      status: 200,
      body: userInfos,
    }
  },
  post: async ({ body }) => {
    const user = await createUser({
      name: body.name,
      email: body.email,
      displayName: body.displayName,
      passphrase: body.passphrase,
      profile: body.profile,
    })

    const userInfo = toUserInfoFull(user)

    return {
      status: 201,
      body: userInfo,
    }
  },
}))
