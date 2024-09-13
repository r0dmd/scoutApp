// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que activa un usuario.
const newPlayerController = async (req, res, next) => {
    try {
        const { firstName, lastName, birthDate, position, skills, team } =
            req.body;

        if (!firstName || !lastName || !birthDate || !position) {
            generateErrorUtil('Faltan campos', 400);
        }

        if (!req.user || !req.user.id) {
            throw generateErrorUtil('El usuario no posee ID válido.', 401);
        }

        const pool = await getPool();

        let [players] = await pool.query(
            `SELECT id FROM players WHERE firstName = ? AND lastName = ? AND birthDate = ?`,
            [firstName, lastName, birthDate],
        );

        if (players.length > 0) {
            generateErrorUtil('Ya existe ese jugador', 409);
        }

        await pool.query(
            `INSERT INTO players (userId, firstName, lastName, birthDate, position, skills, team) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                req.user.id,
                firstName,
                lastName,
                birthDate,
                position,
                skills,
                team,
            ],
        );

        res.status(201).send({
            status: 'ok',
            message: 'Jugador registrado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default newPlayerController;
