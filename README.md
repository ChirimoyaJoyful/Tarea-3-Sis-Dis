# Tarea-3-Sis-Dis

# Para inicializar el proyecto se debe usar el comando docker compose -f "docker-compose.yaml" up -d --build
# Con los contenedores levantados se debe buscar la direccion ip del contenedor cassandra1 y colocarla en "index.js" en la constante contactPoints
# Luego volver a levantar el contenedor de node con el comando docker compose  -f "docker-compose.yaml" up -d --build node
# Luego se tiene que entrar a la consola de cassandra con el comando cqlsh -u cassandra -p cassandra
# Finalmente se crear los keyspaces y las tablas tal como se encuetra en el archivo a.cql
