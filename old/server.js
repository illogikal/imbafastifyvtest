import pkg from 'imba';
const {serve: imba_serve} = pkg;
/*body*/
import Fastify from 'fastify';
const fastify = Fastify();
fastify.get('/',function() { return 'Hello World'; });
imba_serve(fastify.listen({port: 3000},function(err,address) { return console.log(address); }));
