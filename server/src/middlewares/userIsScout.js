// Importamos la función que genera un error.
import generateErrorUtil from '../utils/generateErrorUtil.js';

// Función controladora intermedia que comprueba si el usuario tiene permisos para
// editar la entrada.
const userIsScout = async (req, res, next) => {
    try {
        if (req.user.role !== 'scout') {
            generateErrorUtil('no eres un ojeador');
        }

        // Avanzamos a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default userIsScout;
