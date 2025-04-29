// Composant Navbar
// Un composant de barre de navigation qui affiche des liens vers différentes pages de l'application.
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  // Récupération du token d'authentification depuis le stockage local
  const token = localStorage.getItem('token');
  const location = useLocation();

  // Fonction de gestion de la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  // On affiche la barre de navigation avec des liens conditionnels selon que l'utilisateur est connecté ou non
  return (
    <nav style={styles.navbar}>
      {!token ? (
        <>
          <Link style={{...styles.link, ...(location.pathname === "/" ? styles.active : {})}} to="/">Connexion</Link>
          <Link style={{...styles.link, ...(location.pathname === "/register" ? styles.active : {})}} to="/register">Inscription</Link>
        </>
      ) : (
        <>
          <Link style={{...styles.link, ...(location.pathname === "/profile" ? styles.active : {})}} to="/profile">Profil</Link>
          <Link style={{...styles.link, ...(location.pathname === "/books" ? styles.active : {})}} to="/books">Mes Livres</Link>
          <button style={styles.button} onClick={handleLogout}>Déconnexion</button>
        </>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: 'white',
    padding: '15px 30px',
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '2px solid #4CAF50',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  active: {
    textDecoration: 'underline',
  }
};

export default Navbar;