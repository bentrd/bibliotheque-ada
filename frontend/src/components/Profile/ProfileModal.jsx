import { useState } from 'react';
import CloseButton from '../CloseButton';
import Notification from '../Notification';

function ProfileModal({ email, password, setEmail, setPassword, setShowModal }) {
    const [notification, setNotification] = useState('');
    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault();
        setNotification('Profil mis à jour avec succès !');
        setTimeout(() => {
            setNotification('');
        }, 2000);
    };

    return (
        <>
            {notification && <Notification message={notification} />}
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '12px',
                    minWidth: '300px',
                    position: 'relative'
                }}>
                    <CloseButton onClick={handleClose} />

                    <h3>Modifier Profil</h3>
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
                        <label>Mot de passe :</label>
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