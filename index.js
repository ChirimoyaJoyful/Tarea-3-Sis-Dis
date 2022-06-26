const express = require('express');
const cassandra = require('cassandra-driver');
const { query } = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const contactPoints = ['172.26.0.4'];

const client = new cassandra.Client({
    contactPoints: [contactPoints],
    localDataCenter: 'datacenter1',
    keyspace: 'pacientes',
    credentials: {username: 'cassandra', password: 'cassandra' }
});

const client2 = new cassandra.Client({
    contactPoints: [contactPoints],
    localDataCenter: 'datacenter1',
    keyspace: 'recetas',
    credentials: {username: 'cassandra', password: 'cassandra' }
});


app.post('/create', async (req, res) =>{
    const query1 = 'SELECT * FROM pacientes.paciente WHERE id = ?';
    const query2 = 'INSERT INTO pacientes.paciente (id, nombre, apellido, rut, email, fecha_nacimiento) VALUES (?,?,?,?,?,?)';
    const query3 = 'INSERT INTO recetas.receta (id, id_paciente, comentario, farmacos, doctor) VALUES (?,?,?,?,?)'
    var usr = await client.execute(query1,[req.query.id_p], {prepare: true});
    console.log(usr.rows);
    if(usr.rows[0]){
        console.log("Paciente ya existe");
        await client2.execute(query3,[req.query.id_f, req.query.id_p, req.query.comentario, req.query.farmacos, req.query.doctor], {prepare: true})
            .then(result => console.log("Receta ingresada"));
    }else{
        console.log("Paciente no existia");
        await client2.execute(query3,[req.query.id_f, req.query.id_p, req.query.comentario, req.query.farmacos, req.query.doctor], {prepare: true})
            .then(result => console.log("Receta ingresada"));
        await client.execute(query2,[req.query.id_p, req.query.nombre, req.query.apellido, req.query.rut, req.query.email, req.query.fn], {prepare: true})
            .then(result => console.log("Paciente ingresado"));
    }
    res.sendStatus(200);
});

app.post('/edit', async (req, res) =>{
    const query4 = 'UPDATE recetas.receta SET comentario = ?, farmacos = ?, doctor =? WHERE id = ?';
    await client2.execute(query4,[req.query.comentario, req.query.farmacos, req.query.doctor, req.query.id_f], {prepare: true})
        .then(result => console.log("Receta actualizada"));
    res.sendStatus(200);
});

app.post('/delete', async (req, res) =>{
    const query5 = 'DELETE FROM recetas.receta WHERE id = ?';
    await client2.execute(query5,[req.query.id_f], {prepare: true})
        .then(result => console.log("Receta eliminada"));
    res.sendStatus(200);
});

app.listen(port,() =>{
    console.log('Server running on port', port);
});