import Fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'
import { createUserRoute, updateUserRoute } from './infra/routes/userRoutes'
import { staticFilePlugin } from './infra/plugins/fastifyStatic'
import dotenv from 'dotenv'

dotenv.config()

const fastify = Fastify()


fastify.register(fastifyMultipart)
fastify.register(staticFilePlugin)
fastify.register(createUserRoute)
fastify.register(updateUserRoute)


fastify.get('/', async (request, reply) => {
  return { message: 'Bem vindo a API' }
})

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000
    await fastify.listen({ port, host: '0.0.0.0' })
    console.log(`Servidor HTTP rodando na porta ${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
