require('dotenv').config();
const pwd = process.env.DB2_PASS;

var ibmdb = require('ibm_db');
var connStr = `DATABASE=SAMPLE;HOSTNAME=localhost;UID=db2inst1;PWD=${pwd};PORT=50000;PROTOCOL=TCPIP`;

ibmdb.open(connStr).then(
    conn => {
      conn.query("CALL GETALLEMPLOYEES()").then(data => {
        console.log(data);
        conn.closeSync();
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err)
    }
);