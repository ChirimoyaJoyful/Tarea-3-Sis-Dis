# Tarea 3 Sistemas Distribuidos
Integrantes:
- Joaquín Lagos
- Lucas Muñoz

# Setup

- Para inicializar el proyecto se debe usar el comando ```docker compose -f "docker-compose.yaml" up -d --build```
- Con los contenedores levantados se debe buscar la direccion ip del contenedor cassandra1 y colocarla en "index.js" en la constante ```contactPoints```
- Luego volver a levantar el contenedor de node con el comando ```docker compose  -f "docker-compose.yaml" up -d --build node```
- Luego se tiene que entrar a la consola de cassandra con el comando ```cqlsh -u cassandra -p cassandra```
- Finalmente se crean los keyspaces y las tablas tal como se encuetra en el archivo a.cql

# Instrucciones de uso

- Para el ingreso de receta se usa la url ```localhost:3000/create?id_p={}&nombre={}&apellido={}&rut={}&email={}&fn={}&comentario={}&farmacos={}&doctor={}&id_f={}```
- Para la edición de una receta se usa ```localhost:3000/edit?id_f={}&comentario={}&farmacos={}&doctor={}```
- Para eliminar una receta se usa la url ```localhost:3000/delete?id_f={}```
- En todos los pasos '{}' debe ser reemplazado por los valores deseados.
- Todos los pasos anteriores deben ser efectuados en Postman para su funcionamiento.

# Preguntas

1. Explique la arquitectura que Cassandra maneja. Cuando se crea el clúster ¿Cómo los nodos se conectan? ¿Qué
ocurre cuando un cliente realiza una petición a uno de los nodos? ¿Qué ocurre cuando uno de los nodos se desconecta?
¿La red generada entre los nodos siempre es eficiente? ¿Existe balanceo de carga?

R. Cassandra funciona como un grupo de nodos, en donde ellos se encuentran conectados en forma de anillos, además cada keyspace tiene un factor de replicación que indica en cuántos nodos del cluster (grupo de nodos) se encuentra replicado. Cuando se hace una petición de parte de un cliente, el nodo coordinador envía esta petición a los demás nodos del cluster, de tal manera que en el caso que se escriba nueva información ésta sea almacenada en todo nodo que corresponda. En el caso de que un nodo se desconecte, el servicio debería funcionar sin problema alguno, esto es debido a que los demás nodos cumplirán la función de el nodo caído, en el caso de que el nodo o nodos que se desconecten son todos los puntos de contacto entre cassandra y el cliente, en ese momento la conexión dejará de funcionar. Ya que la red siempre tiene una forma de mantenerse en línea en caso de fallas, se puede decir que es eficiente en todo momento.
Debido a la estructura distribuida de Cassandra se encuentra la existencia de balanceo de carga, en donde las consultas se van repartiendo entre los nodos disponibles para aliviar la carga del clúster.

2. Cassandra posee principalmente dos estrategias para mantener redundancia en la replicación de datos. ¿Cuáles son
estos? ¿Cuál es la ventaja de uno sobre otro? ¿Cuál utilizaría usted para en el caso actual y por qué? Justifique
apropiadamente su respuesta.

R. La primera estrategia es “Simple strategy”, está pensada para situaciones en las cuales se cuenta con solo un cluster y está ubicado en un solo datacenter, ya que no cuenta con la capacidad de saber la topología de la red. La segunda estrategia es Network Topology Strategy, cuando se utiliza esta estrategia, se debe configurar y asignar los nodos a los diferentes racks y datacenters, ya que no tiene otra forma de conocer la topología. La ventaja de NTS, obviamente es la capacidad de adaptarse a una topología con diversos datacenters. 
En el caso actual, asumiendo que la organización le dedica tan solo un rack al servicio, se recomienda utilizar la estrategia simple, ahorrando la configuración necesaria de racks en NTS. Cassandra podría detectar los nodos creando tan solo un clúster. La desventaja es que si el rack falla, se pierde todo, ya que todos las réplicas se encuentran en el mismo.


3. Teniendo en cuenta el contexto del problema ¿Usted cree que la solución propuesta es la correcta? ¿Qué ocurre
cuando se quiere escalar en la solución? ¿Qué mejoras implementaría? Oriente su respuesta hacia el Sharding (la
replicación/distribución de los datos) y comente una estrategia que podría seguir para ordenar los datos.

R. Para el contexto planteado, la solución puede ser mejorada. En cuanto al modelo de la base de datos, si se utiliza el rut como primary key en la tabla paciente, en vez de tener un ID, se podría buscar por rut directamente (siguiendo la limitación de Cassandra de no poder filtrar las sentencias SELECT con columnas que no son primary key).  Si se quisiera escalar, al ser una base de datos donde se van agregando más elementos sería necesario hacer uso de sharding, ya que al llegar un momento en donde existan demasiados elementos el tiempo de respuesta empeorará, es por eso que con sharding, al separar esta información y guardarla en distintos nodos, el modelo será más distribuido y mejorará el funcionamiento de la aplicación. Se podría utilizar la estrategia de consistent hash sharding, de tal forma que a cada nodo se le asigna un rango de hash y al pasar el valor de la primary key por una función hash definida, se asigna al nodo donde esté dentro del rango.

