// TODO: SI ESTAMOS LOGEADOS, REDIRIGIR A HOME -- SI YA EXISTE EL USUARIO

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;

const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [role, setRole] = useState(null);
  const [birthDate, setBirthDate] = useState('');

  const isAdult = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      if (password !== repeatPass) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (!password || !repeatPass || !email) {
        throw new Error('Faltan campos');
      }

      if (isAdult(birthDate) < 18) {
        throw new Error('Debes ser mayor de 18 años para registrarte');
      }

      const res = await fetch(`${VITE_API_URL}/api/users/register`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          role,
          birthDate,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const body = await res.json();

      if (body.status === 'error') {
        throw new Error(body.message);
      }

      navigate('/login');

      toast.success(body.message, {
        id: 'register',
      });
    } catch (err) {
      toast.error(err.message, {
        id: 'register',
      });
    }
  };

  return (
    <>
      <h2>Regístrate</h2>

      <form onSubmit={handleRegister}>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor='pass'>Contraseña:</label>
        <input
          type='password'
          id='pass'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor='repPass'>Repite tu contraseña:</label>
        <input
          type='password'
          id='repPass'
          value={repeatPass}
          onChange={(e) => setRepeatPass(e.target.value)}
          required
        />

        <label>Selecciona tu rol:</label>
        <div>
          <label>
            <input
              type='radio'
              name='role'
              value='scout'
              checked={role === 'scout'}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            Ojeador
          </label>
          <label>
            <input
              type='radio'
              name='role'
              value='family'
              checked={role === 'family'}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            Familia
          </label>
        </div>

        <label htmlFor='birthDate'>Introduce tu fecha de nacimiento:</label>
        <input
          type='date'
          id='birthDate'
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />

        <button>Registrarme</button>
      </form>
    </>
  );
};

export default RegisterPage;
