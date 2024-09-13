# Ojeador deportivo

Crea un servidor y un cliente para hacer funcionar la aplicación.

// Crear initdb.js (opcional)

## Endpoints comunes de familias y ojeadores

✅- **POST** - [`/users/register`] - Crea un nuevo usuario pendiente de activar.
✅- **PUT** - [`/users/activate/:registrationCode`] - Activa a un usuario mediante un código de registro.
✅- **POST** - [`/users/login`] - Logea a un usuario retornando un token.
✅- **GET** - [`/users/`] - Retorna perfil privado del usuario.

## Endpoints de jugadores

✅- **POST** - [`/players`] - Crea un jugador.

✅- **GET** - [`/players`] - Devuelve listado de jugadores. Permite filtrar por edad, puesto, skills, equipo actual.

✅- **POST** - [`/players/:playerId/videos`] - Añadir vídeo.

✅- **GET** - [`/players/:playerId`] - Devuelve info de jugador concreto con vídeos.

-   **POST** - [`/players/:playerId/contact`] - Solo para ojeadores, es para contactar las familias.
-   **PUT** - [`/players/:playerId/contact/:contactId`] - Permite que un usuario familia acepte o decline la oferta.

//BONUS

-   **DELETE** - [`/players/:playerId/videos/:videoId`] - Eliminar un vídeo.
