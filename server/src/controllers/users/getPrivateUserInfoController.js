// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que activa un usuario.
const getPrivateUserInfoController = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const pool = await getPool();

        const [users] = await pool.query(
            `SELECT id, email, role, birthDate, createdAt FROM users WHERE id = ?`,
            [userId],
        );

        if (users.length < 1) {
            generateErrorUtil('Usuario no existe', 404);
        }

        res.send({
            status: 'ok',
            data: {
                user: users[0],
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getPrivateUserInfoController;
