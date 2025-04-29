import { useState } from 'react';
import API from '../../services/api'; // Importation de l'instance API
import CloseButton from '../CloseButton';
import Notification from '../Notification';

// Composant ProfileModal permettant d'afficher un formulaire modal pour modifier les informations du profil utilisateur (email et mot de passe)
function ProfileModal({ email, password, setEmail, setPassword, setShowModal }) {
    const [notification, setNotification] = useState('');
    const [error, setError] = useState('');

    // Fonction pour fermer le modal
    const handleClose = () => setShowModal(false);

    // Fonction de sauvegarde des modifications
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            // Envoi de la requête PUT pour mettre à jour le profil via l'API
            const response = await API.put('/auth/me', { email, password });

            // Si tout se passe bien, affichage de la notification de succès
            setNotification('Profil mis à jour avec succès !');
            setTimeout(() => setNotification(''), 2000); // Effacement de la notification après 2 secondes
        } catch (err) {
            // En cas d'erreur, affichage de l'erreur dans une notification
            setError('Erreur lors de la mise à jour du profil.');
            setTimeout(() => setError(''), 2000); // Effacement de l'erreur après 2 secondes
        }
    };

    return (
        <>
            {notification && <Notification message={notification} />}
            {error && <Notification message={error} />} {/* Affichage de l'erreur */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                justifyContent: 'center', alignItems: 'center', zIndex: 1000
            }}>
                <div style={{
                    backgroundColor: 'white', padding: '30px', borderRadius: '12px', minWidth: '300px', position: 'relative'
                }}>
                    <CloseButton onClick={handleClose} />
                    <h3 style={{textAlign: 'center'}}>Modifier Profil</h3>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email :</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Nouveau mot de passe :</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>
                    <button onClick={handleSave} style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        border: 'none',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}>
                        Sauvegarder
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProfileModal;