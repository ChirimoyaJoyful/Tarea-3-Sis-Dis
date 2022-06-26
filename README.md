# Tarea 3 Sistemas Distribuidos
Integrantes:
- Joaquín Lagos
- Lucas Muñoz

# Instrucciones de uso

- Para inicializar el proyecto se debe usar el comando docker compose -f "docker-compose.yaml" up -d --build
- Con los contenedores levantados se debe buscar la direccion ip del contenedor cassandra1 y colocarla en "index.js" en la constante contactPoints
- Luego volver a levantar el contenedor de node con el comando docker compose  -f "docker-compose.yaml" up -d --build node
- Luego se tiene que entrar a la consola de cassandra con el comando cqlsh -u cassandra -p cassandra
- Finalmente se crear los keyspaces y las tablas tal como se encuetra en el archivo a.cql

# Preguntas

1. Explique la arquitectura que Cassandra maneja. Cuando se crea el clúster ¿Cómo los nodos se conectan? ¿Qué
ocurre cuando un cliente realiza una petición a uno de los nodos? ¿Qué ocurre cuando uno de los nodos se desconecta?
¿La red generada entre los nodos siempre es eficiente? ¿Existe balanceo de carga?

2. Cassandra posee principalmente dos estrategias para mantener redundancia en la replicación de datos. ¿Cuáles son
estos? ¿Cuál es la ventaja de uno sobre otro? ¿Cuál utilizaría usted para en el caso actual y por qué? Justifique
apropiadamente su respuesta.

3. Teniendo en cuenta el contexto del problema ¿Usted cree que la solución propuesta es la correcta? ¿Qué ocurre
cuando se quiere escalar en la solución? ¿Qué mejoras implementaría? Oriente su respuesta hacia el Sharding (la
replicación/distribución de los datos) y comente una estrategia que podría seguir para ordenar los datos.
