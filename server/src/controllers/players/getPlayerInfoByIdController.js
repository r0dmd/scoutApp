// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora que activa un usuario.
const getPlayerInfoByIdController = async (req, res, next) => {
    try {
        const { playerId } = req.params;

        const pool = await getPool();

        const [player] = await pool.query(
            `
            SELECT
                p.firstName,
                p.lastName,
                p.birthDate,
                p.position,
                p.skills,
                p.team,
                u.email AS family,
                p.createdAt
            FROM players AS p
            INNER JOIN users u ON u.id = p.userId
            WHERE p.id LIKE ?
          
            `,
            [playerId],
        );
        const [videos] = await pool.query(
            `SELECT title, url FROM videos WHERE playerId = ? `,
            [playerId],
        );
        player[0].videos = videos;

        res.send({
            status: 'ok',
            message: 'Mostrando jugador',
            data: {
                player,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getPlayerInfoByIdController;
