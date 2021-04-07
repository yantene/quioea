import React from 'react'
import { cache } from 'swr'
import dotenv from 'dotenv'
import Fastify, { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import aspida from '@aspida/axios'
import api from '~/server/api/$api'
import Home from '~/pages/index'
import { render, fireEvent } from '../testUtils'

dotenv.config({ path: 'server/.env' })

const apiClient = api(aspida(undefined, { baseURL: process.env.API_BASE_PATH }))
const res = function <T extends () => any>(
  data: ReturnType<T> extends Promise<infer S> ? S : never
) {
  return data
}

let fastify: FastifyInstance

beforeAll(() => {
  fastify = Fastify()
  fastify.register(cors)
  fastify.get(apiClient.tasks.$path(), (_, reply) => {
    reply.send(
      res<typeof apiClient.tasks.$get>([
        { id: 1, label: 'foo task', done: false },
        { id: 2, label: 'bar task', done: true }
      ])
    )
  })

  return fastify.listen(process.env.API_SERVER_PORT ?? 8080)
})

afterEach(() => cache.clear())
afterAll(() => fastify.close())

describe('Home page', () => {
  it('matches snapshot', async () => {
    const { asFragment, findByText } = render(<Home />, {})

    await findByText('foo task')
    expect(asFragment()).toMatchSnapshot()
  })

  it('clicking button triggers prompt', async () => {
    const { findByText } = render(<Home />, {})

    window.prompt = jest.fn()
    window.alert = jest.fn()

    fireEvent.click(await findByText('LOGIN'))
    expect(window.prompt).toHaveBeenCalledWith(
      'Enter the user id (See server/.env)'
    )
    expect(window.alert).toHaveBeenCalledWith('Login failed')
  })
})
