import { useState } from 'react';
import API from '../services/api';
import ErrorTooltip from '../components/ErrorTooltip';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await API.post('/auth/register', { email, password });
      window.location.href = '/';
    } catch (error) {
      setError('Erreur lors de l\'inscription.');
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h2>Inscription</h2>
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
          <input
            type="password"
            placeholder="Confirmer mot de passe"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (error) setError('');
            }}
            required
          />
          <button type="submit">S'inscrire</button>
        </form>
        <ErrorTooltip message={error} />
      </div>
    </div>
  );
}

export default Register;