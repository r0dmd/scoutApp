// Añadimos al proceso actual la lista de variables de entorno que figuran en el fichero ".env".
import 'dotenv/config';

// Función que retorna una conexión con la base de datos.
import getPool from './getPool.js';

// Función que genera las tablas.
const main = async () => {
    try {
        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        console.log('Borrando tablas...');

        // Borramos las tablas.
        await pool.query(
            `DROP TABLE IF EXISTS hiringRequests, videos, players, users`,
        );

        console.log('Creando tablas...');

        // Creamos la tabla de usuarios.
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    birthDate DATE NOT NULL,
    role ENUM("family", "scout") NOT NULL,
    registrationCode CHAR(30),
    active BOOLEAN DEFAULT false,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

        // Creamos la tabla de jugadores.
        await pool.query(`CREATE TABLE IF NOT EXISTS players (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userId INT UNSIGNED NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id),
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    birthDate DATE NOT NULL,
    position VARCHAR(50) NOT NULL, 
    skills VARCHAR(500), 
    team VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

        // Creamos la tabla de videos.
        await pool.query(`CREATE TABLE IF NOT EXISTS videos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    playerId INT UNSIGNED NOT NULL,
    FOREIGN KEY(playerId) REFERENCES players(id),
    title VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

        //Creamos la tabla de contrataciones.
        await pool.query(`CREATE TABLE IF NOT EXISTS hiringRequests (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userId INT UNSIGNED NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id),
    playerId INT UNSIGNED NOT NULL,
    FOREIGN KEY(playerId) REFERENCES players(id),
    status ENUM("pendiente", "aceptada", "rechazada") DEFAULT "pendiente",
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

        console.log('¡Tablas creadas!');

        // Cerramos el proceso con código 0 indicando que todo ha ido bien.
        process.exit(0);
    } catch (err) {
        console.error(err);

        // Cerramos el proceso con código 1 indicando que hubo un error.
        process.exit(1);
    }
};

// Llamamos a la función anterior.
main();
