CREATE KEYSPACE "pacientes"
    WITH REPLICATION = {
        'class' : 'SimpleStrategy',
        'replication_factor': 2
    };
CREATE KEYSPACE "recetas"
    WITH REPLICATION = {
        'class' : 'SimpleStrategy',
        'replication_factor': 3
    };

CREATE TABLE "paciente" (
    "id" int,
    "nombre" text,
    "apellido" text,
    "rut" TEXT,
    "email" text,
    "fecha_nacimiento" text,
    PRIMARY KEY ("id")
); 

CREATE TABLE "receta" (
    "id" int,
    "id_paciente" int,
    "comentario" text,
    "farmacos" text,
    "doctor" text,
    PRIMARY KEY ("id")
);