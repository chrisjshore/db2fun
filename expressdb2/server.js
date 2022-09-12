const express = require('express')
const app = express()
const port = 4000

require('dotenv').config();
const pwd = process.env.DB2_PASS;

var ibmdb = require('ibm_db');
var db2   = new ibmdb.Database();
var dbcon = `DATABASE=SAMPLE;HOSTNAME=localhost;UID=db2inst1;PWD=${pwd};PORT=50000;PROTOCOL=TCPIP`;

query = (proc, reply) => {
  const data = db2.querySync(proc);

  data.length ? reply.send(data) : reply.status(204).send();
}

app.get('/employees', async (request, reply) => {
  query("CALL GETALLEMPLOYEES()", reply);
});

app.get('/employees/:id', async (request, reply) => {
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

app.get('/', (req, res) => {
  res.send('Hello World!')
});

shutdown = () => {
  console.log('Kill signal received: closing HTTP server');

  server.close(() => {
    console.log('Closing database connection');
    db2.closeSync();
    console.log('HTTP server closed');
  });
}

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  db2.open(dbcon);
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
