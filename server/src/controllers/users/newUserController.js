// Importamos las dependencias necesarias.
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que envía un email.
import sendMailUtil from '../../utils/sendMailUtil.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite crear un usuario.
const newUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { email, password, role, birthDate } = req.body;

        // Si falta algún campo lanzamos un error.
        if (!email || !password || !role || !birthDate) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos el listado de usuarios con el email de usuario recibido.
        let [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [
            email,
        ]);

        // Si existe algún usuario con ese email lanzamos un error.
        if (users.length > 0) {
            generateErrorUtil('Email no disponible', 409);
        }

        // Creamos un código de registro.
        const registrationCode = crypto.randomBytes(15).toString('hex');

        // Encriptamos la contraseña.
        const hashedPass = await bcrypt.hash(password, 10);

        // Insertamos el usuario.
        await pool.query(
            `INSERT INTO users(email, password, role, birthDate, registrationCode) VALUES(?, ?, ?, ?, ?)`,
            [email, hashedPass, role, birthDate, registrationCode],
        );

        // Asunto del email de verificación.
        const emailSubject = 'Activa tu usuario en Ojeador Deportivo ⚽';

        // Cuerpo del email de verificación.
        const emailBody = `
            ¡Bienvenid@!

            Gracias por registrarte en Ojeador Deportivo. Para activar tu cuenta, haz click en el siguiente enlace:

            <a href="${process.env.CLIENT_URL}/users/activate/${registrationCode}">¡Activa tu usuario!</a>
        `;

        // Enviamos el email.
        await sendMailUtil(email, emailSubject, emailBody);

        // Enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message:
                'Usuario registrado. En breve recibirás un enlace de verificación en tu correo electrónico.',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserController;
