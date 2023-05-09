import Fastify from 'fastify'

const fastify = Fastify!

fastify.get '/', do 'Hello World'

imba.serve fastify.listen({ port: 3000 }, do(err, address) console.log address)