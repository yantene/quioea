import { FastifyInstance } from "fastify"
import cookie from "cookie"

export function getLoginUserId(
  headers: { cookie: string },
  fastify: FastifyInstance,
) {
  const data = fastify.jwt.decode<{
    id: string
    iat: number
  }>(cookie.parse(headers.cookie).SESSIONID)

  return data?.id
}
