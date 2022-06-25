const express = require('express');
const cassandra = require('cassandra-driver');

const app = express();
const port = 3000;

app.use(express.json());

const contactPoints = ['127.0.0.1'];

const client = new cassandra.Client({
    contactPoints: [contactPoints],
    localDataCenter: 'datacenter1',
    keyspace: 'db'
});


app.post('/create', async (req, res) =>{

});

app.post('/edit', async (req, res) =>{

});

app.post('/delete', async (req, res) =>{

});

app.listen(port,() =>{
    console.log('Server running on port', port);
});