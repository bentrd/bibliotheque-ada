import { Link } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav style={styles.navbar}>
      {!token ? (
        <>
          <Link style={styles.link} to="/">Connexion</Link>
          <Link style={styles.link} to="/register">Inscription</Link>
        </>
      ) : (
        <>
          <Link style={styles.link} to="/profile">Profil</Link>
          <Link style={styles.link} to="/books">Mes Livres</Link>
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
};

export default Navbar;