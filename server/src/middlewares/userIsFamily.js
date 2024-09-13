// Importamos la función que genera un error.
import generateErrorUtil from '../utils/generateErrorUtil.js';

// Función controladora intermedia que comprueba si el usuario tiene permisos para
// editar la entrada.
const userIsFamily = async (req, res, next) => {
    try {
        if (req.user.role !== 'family') {
            generateErrorUtil('no eres un familiar');
        }

        // Avanzamos a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default userIsFamily;
