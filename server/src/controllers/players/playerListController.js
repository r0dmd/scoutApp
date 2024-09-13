// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// // Importamos la función que genera un error.
// import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que activa un usuario.
const playerListController = async (req, res, next) => {
    try {
        let { birthDate, position } = req.query;

        const pool = await getPool();

        const [players] = await pool.query(
            `
            SELECT
                p.id,
                p.firstName,
                p.lastName,
                p.birthDate,
                p.position,
                p.skills,
                p.team,
                u.email AS family,
                p.createdAt
            FROM players p
            INNER JOIN users u ON u.id = p.userId
            WHERE p.birthDate LIKE ? AND p.position LIKE ?
            GROUP BY p.id
            `,
            [`%${birthDate || ''}%`, `%${position || ''}%`],
        );

        res.send({
            status: 'ok',
            message: 'Mostrando lista de jugadores',
            data: {
                players,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default playerListController;
