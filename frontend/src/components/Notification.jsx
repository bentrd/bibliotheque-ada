// Composant de Notification
// Un composant qui affiche une notification à l'utilisateur.
// Il est utilisé pour informer l'utilisateur d'un événement ou d'une action réussie dans l'application.
import './Notification.css';

function Notification({ message }) {
    // Si le message est vide ou nul, ne rien afficher
    if (!message) return null;

    return (
        <div className="notification">
            {message}
        </div>
    );
}

export default Notification;