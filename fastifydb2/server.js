const fastify = require('fastify')({
  logger: true
});
const traps = require('@dnlup/fastify-traps');
const ibmdb = require('ibm_db');
require('dotenv').config();

const pwd = process.env.DB2_PASS;
const db2 = new ibmdb.Database();
const con = `DATABASE=SAMPLE;HOSTNAME=localhost;UID=db2inst1;PWD=${pwd};PORT=50000;PROTOCOL=TCPIP`;

fastify.register(traps);

query = (proc, reply) => {
  const data = db2.querySync(proc);

  data.length ? reply.send(data) : reply.status(204).send();
}

fastify.get('/employees', async (request, reply) => {
  query("CALL GETALLEMPLOYEES()", reply);
});

fastify.get('/employees/:id', async (request, reply) => {
  // floats will slip past parseInt by dropping the decimal 
  // thereby returning a misleading status code
  if(request.params.id % 1 !== 0){
    reply.code(403).send();
  }
  
  if(Number.isSafeInteger(parseInt(request.params.id))){
    query(`CALL GETEMPLOYEEBYID(${request.params.id})`, reply);
  }
  else{
    // strings, objects, etc
    reply.code(403).send();
  }
});

fastify.addHook('onClose', (instance, done) => {
  fastify.log.info('Kill signal received: closing HTTP server');
  fastify.log.info('Closing database connection');
  db2.closeSync();
  fastify.log.info('HTTP server closed');
  done()
});

const start = async () => {
  try {
    await fastify.listen(3000);
    db2.open(con);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();
