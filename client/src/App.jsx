// Importamos los componentes.
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';

// Importamos las páginas.
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ActivateUserPage from './pages/ActivateUserPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import PlayerListPage from './pages/PlayerListPage';
import NewPlayerPage from './pages/NewPlayerPage';
import UploadVideoPage from './pages/UploadVideoPage';
import NotFoundPage from './pages/NotFoundPage';
import PlayerDetailsPage from './pages/PlayerDetailsPage';

// Aplicamos los estilos.
import './index.css';

// Inicializamos el componente principal.
const App = () => {
  return (
    <>
      <Header />

      <Toaster
        position='top-center'
        toastOptions={{
          duration: 5000,
        }}
      />

      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/users/activate/:registrationCode'
          element={<ActivateUserPage />}
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/users/profile' element={<UserProfilePage />} />

        <Route path='/players' element={<PlayerListPage />} />
        <Route path='/players/new' element={<NewPlayerPage />} />
        <Route path='/players/upload' element={<UploadVideoPage />} />
        <Route path='/players/:playerId' element={<PlayerDetailsPage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
