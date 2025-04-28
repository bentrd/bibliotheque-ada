// Page d'inscription
// Permet à un utilisateur de créer un compte en fournissant son email et un mot de passe
// Un message d'erreur est affiché si les mots de passe ne correspondent pas ou si l'inscription échoue
import { useState } from 'react';
import API from '../services/api';
import ErrorTooltip from '../components/ErrorTooltip';

function Register() {
  // Déclaration des états pour gérer l'email, le mot de passe, la confirmation du mot de passe et les erreurs de validation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Fonction qui gère la soumission du formulaire d'inscription
  // Elle vérifie que les mots de passe correspondent et envoie les données au backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification que le mot de passe et la confirmation du mot de passe sont identiques
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      // Envoi des données (email et mot de passe) au backend pour créer un nouvel utilisateur
      await API.post('/auth/register', { email, password });
      window.location.href = '/';
      // Si l'inscription réussit, l'utilisateur est redirigé vers la page principale (page d'accueil)
    } catch (error) {
      setError('Erreur lors de l\'inscription.');
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h2>Inscription</h2>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Formulaire d'inscription avec les champs email, mot de passe et confirmation du mot de passe */}
        {/* Chaque champ met à jour son état respectif */}
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
        {/* Affichage d'un tooltip d'erreur si un message d'erreur est présent */}
        <ErrorTooltip message={error} />
      </div>
    </div>
  );
}

export default Register;