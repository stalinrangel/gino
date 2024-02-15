API GINO

Version de node 20.11.0

Antes de correr la api ingresa a la carpeta aplicacion y ejecutas npm i o npm i --force.(toda la api esta en la carpeta aplicacion) y a continuacion realizas los siguientes pasos:

1. Crear archivo .env con esta configuracion:
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_NAME="gino"
SECRET_KEY="gino123"

2. Creas la base de datos con con el nombre "gino" y clave "gino123" o la que quieras solo la tienes que cambiar en el archivo .env si decides poner otra.

3. Luego corres las migraciones con el comando "knex migrate:latest"

4. Luego correr las semillas donde se crearan los roles automanticamente con el comando "knex seed:run"

5. Ultimo paso correr la api con "nodemon npm start"
	y deberia ejecutarse en el http://localhost:3000/, si cambias de puerto es necesario cambiarlo en la web ya que esta apuntando a esta url. Ahora ya puedes probar la web.


