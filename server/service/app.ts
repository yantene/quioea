import path from "path"
import Fastify, { FastifyServerFactory } from "fastify"
import helmet from "fastify-helmet"
import cors from "fastify-cors"
import fastifyStatic from "fastify-static"
import fastifyJwt from "fastify-jwt"
import {
  API_JWT_SECRET,
  API_BASE_PATH,
  API_UPLOAD_DIR,
  API_SESSION_COOKIE_NAME,
} from "$/service/envValues"
import server from "$/$server"

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory })

  app.register(helmet)

  app.register(cors)

  app.register(fastifyStatic, {
    root: path.join(__dirname, "static"),
    prefix: "/static/",
  })

  if (API_UPLOAD_DIR) {
    app.after(() => {
      app.register(fastifyStatic, {
        root: path.resolve(__dirname, API_UPLOAD_DIR),
        prefix: "/upload/",
        decorateReply: false,
      })
    })
  }

  app.register(fastifyJwt, {
    secret: API_JWT_SECRET,
    cookie: {
      cookieName: API_SESSION_COOKIE_NAME,
      signed: true,
    },
  })

  server(app, { basePath: API_BASE_PATH })
  return app
}
