const express = require('express');
const casandra = require('cassandra-driver');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/create', async (req, res) =>{

});

app.post('/edit', async (req, res) =>{

});

app.post('/delete', async (req, res) =>{

});

app.listen(port,() =>{
    console.log('Server running on port', port);
});