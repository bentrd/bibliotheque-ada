import { useState } from 'react';
import API from '../services/api';
import ErrorTooltip from '../components/ErrorTooltip';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/books';
    } catch (error) {
      setError('Erreur de connexion');
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Connexion</h2>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            required
          />
          <button type="submit">Se connecter</button>
        </form>
        <ErrorTooltip message={error} />
      </div>
    </div>
  );
}

export default Login;