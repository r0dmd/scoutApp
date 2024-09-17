import { NavLink } from 'react-router-dom';
const Header = () => {
  return (
    <>
      <h1>
        <a href='/'>ScoutApp</a>
      </h1>

      <nav>
        <NavLink className='navlink' to='/register'>
          Registro
        </NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/users/profile'>Mi Perfil</NavLink>
        <NavLink to='/players'>Lista de jugadores</NavLink>
        <NavLink to='/players/new'>Nuevo jugador</NavLink>
        <NavLink to='/players/upload'>Subir vídeo</NavLink>
        <NavLink to='/register'>Registro</NavLink>
        <NavLink to='/players/:playerId'>Detalles de jugador</NavLink>
      </nav>
    </>
  );
};

export default Header;
