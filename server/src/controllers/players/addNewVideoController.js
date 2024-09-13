// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que activa un usuario.
const addNewVideoController = async (req, res, next) => {
    try {
        const pool = await getPool();
        const { playerId } = req.params;

        const [players] = await pool.query(
            `SELECT id FROM players WHERE id = ?`,
            [playerId],
        );

        if (players.length < 1) {
            generateErrorUtil('El jugador no existe', 404);
        }

        const { title, url } = req.body;

        if (!title || !url) {
            generateErrorUtil('´Faltan Campos', 400);
        }

        const [results] = await pool.query(
            `
            SELECT v.url
            FROM videos v
            INNER JOIN players p ON v.playerId = p.id
            WHERE v.url = ? AND p.id = ?
            `,
            [url, playerId],
        );

        if (results.length > 0 && results[0].url === url) {
            throw generateErrorUtil(
                'El vídeo ya existe en la base de datos',
                409,
            );
        }

        await pool.query(
            `INSERT INTO videos(title, url, playerId) VALUES (?,?,?)`,
            [title, url, playerId],
        );

        res.status(201).send({
            status: 'ok',
            message: 'Url del video añadido',
            data: {
                title,
                url,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default addNewVideoController;
