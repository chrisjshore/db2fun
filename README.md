# README

Demo projects for comparing the speed of Node.js REST API's leveraging DB2 stored procedures.

## Build Environment

1. Install [docker](https://www.docker.com/products/docker-desktop)
2. Install DB2 `docker pull ibmcom/db2`
3. Install [Node.js](https://nodejs.org/)

### Create DB2 Instance

Open a terminal and run the below command making sure to update the password and specifying a source mount to something of your choosing.  
`docker run -itd --name db2 --privileged=true -p 50000:50000 -e LICENSE=accept -e DB2INST1_PASSWORD=somepassword -e SAMPLEDB=true -v C:\Temp\db2:/database ibmcom/db2`  

Optionally connect to your db2 container to make sure the instance is accessible.  
`docker exec -ti db2 bash -c "su - db2inst1"`  
From within the container run`db2 connect to sample`.   You should see connection information such as the server version, user ID, and database alias.
To see a list of tables run`db2 list tables`

### Stage DB2 with stored procedures

Using a database management tool like [DBeaver](https://dbeaver.io/), connect to the DB2 instance.  Open the stored procedure SQL files in the Scripts directory and execute them.

### Run Servers

Create .env files in any of the directories you wish to run and add your DB2 password in the form of `DB2_PASS=somepassword`.  The dotenv package will read this file and send the password to the app.

Open a terminal and from each of the project directories run `npm i`.

Once installed run `node server.js` in the expressdb2 and/or fastifydb2 directory.  Alternatively you can run `npm run nodemon`.

To test connectivity to DB2 without any web framework, open the nodedb2 directory and run `node index.js`.

### Test Servers

Using a tool like [Postman](https://www.postman.com/), connect to the endpoints of either server.

fastifydb2 examples:  
`localhost:3000`  
`localhost:3000/employees`  
`localhost:3000/employees/230`  
expressdb2 examples:  
`localhost:4000`  
`localhost:4000/employees`  
`localhost:4000/employees/230`