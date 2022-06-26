const express = require('express');
const cassandra = require('cassandra-driver');

const app = express();
const port = 3000;

app.use(express.json());

const contactPoints = ['cassandra1'];

const client = new cassandra.Client({
    contactPoints: [contactPoints],
    localDataCenter: 'datacenter1',
    keyspace: 'tarea3'
});


app.post('/create', async (req, res) =>{
    const query = 'INSERT INTO tarea3.paciente (id, nombre, apellido, email, fecha_nacimiento) VALUES (?,?,?,?,?)';
    
    await client.execute(query,[req.query.id, req.query.nombre, req.query.apellido, req.query.email, req.query.fn])
        .then(result => console.log("chupa la corneturri"));

});

app.post('/edit', async (req, res) =>{

});

app.post('/delete', async (req, res) =>{

});

app.listen(port,() =>{
    console.log('Server running on port', port);
});