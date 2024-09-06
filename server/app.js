// Añadimos al proceso actual la lista de variables de entorno del fichero ".env".
import 'dotenv/config';

// Importamos las dependencias necesarias.
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Importamos las rutas.
import userRoutes from './src/routes/userRoutes.js';
import playersRoutes from './src/routes/playersRoutes.js';

// Importamos las variables de entorno necesarias.
const { PORT } = process.env;

// Creamos el servidor.
const app = express();

// Middleware que evita problemas de conexión entre cliente y servidor.
app.use(cors());

// Middleware que muestra por consola info sobre la petición entrante.
app.use(morgan('dev'));

// Middleware que permite leer un body en formato JSON.
app.use(express.json());

// Middleware que indica a Express dónde están las rutas.
app.use('/api', userRoutes);
app.use('/api', playersRoutes);

// Middleware de manejo de errores.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

// Indicamos al servidor que escuche peticiones en un puerto dado.
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
