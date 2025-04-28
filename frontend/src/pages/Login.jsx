// Page de connexion
// Permet à l'utilisateur de se connecter en fournissant son email et son mot de passe
// Si l'authentification réussit, l'utilisateur est redirigé vers la page principale des livres
import { useState } from 'react';
import API from '../services/api';
import ErrorTooltip from '../components/ErrorTooltip';

function Login() {
  // Déclaration de l'état pour stocker l'email et le mot de passe saisis par l'utilisateur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Fonction qui gère la soumission du formulaire de connexion
  // Elle envoie les données à l'API pour vérifier les identifiants de l'utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérifie que l'email et le mot de passe sont bien renseignés avant d'envoyer la requête
    try {
      // Envoi des données au backend pour tenter la connexion
      // Si l'utilisateur est authentifié, le token JWT est reçu en réponse
      const res = await API.post('/auth/login', { email, password });
      // Stocke le token JWT dans le localStorage pour maintenir l'utilisateur connecté
      localStorage.setItem('token', res.data.token);
      // Redirige l'utilisateur vers la page principale des livres après une connexion réussie
      window.location.href = '/books';
    } catch (error) {
      setError('Erreur de connexion');
    }
  };

  // Formulaire de connexion avec gestion des erreurs d'authentification
  // L'utilisateur doit saisir son email et son mot de passe
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