import { API_SESSION_COOKIE_NAME } from "$/service/envValues"
import { toUserInfoFull, validateUser } from "$/service/user"
import { getLoginUserId } from "$/utils/session"
import { PrismaClient } from "@prisma/client"
import { defineController } from "./$relay"

const prisma = new PrismaClient()

export default defineController((fastify) => ({
  get: async ({ headers }) => {
    const loginUserId = getLoginUserId(headers, fastify)

    if (loginUserId == null) {
      return {
        status: 401,
      }
    }

    const user = await prisma.user.findUnique({
      where: { id: loginUserId },
    })

    if (user == null) {
      return {
        status: 401,
      }
    }

    const userInfoFull = toUserInfoFull(user)

    return {
      status: 200,
      body: userInfoFull,
    }
  },
  put: async ({ body }) => {
    const user = await prisma.user.findUnique({
      where: { name: body.userName },
    })

    if (user == null) {
      return {
        status: 401,
      }
    }

    const valid = await validateUser(user, body.userPassphrase)
    if (!valid) {
      return {
        status: 401,
      }
    }

    const userInfoFull = toUserInfoFull(user)

    return {
      status: 201,
      body: userInfoFull,
      headers: {
        "Set-Cookie": `${API_SESSION_COOKIE_NAME}=${fastify.jwt.sign({
          id: user.id,
        })}; SameSite=Strict; HttpOnly`,
      },
    }
  },
  delete: async () => {
    return {
      status: 204,
      headers: { "Set-Cookie": `${API_SESSION_COOKIE_NAME}=` },
    }
  },
}))
