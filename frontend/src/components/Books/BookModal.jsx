// Importation des composants nécessaires : CloseButton pour fermer le modal, ErrorTooltip pour afficher les erreurs, et la liste des genres disponibles
import CloseButton from '../CloseButton';
import ErrorTooltip from '../ErrorTooltip';
import genres from '../../data/genres';

// Composant fonctionnel BookModal qui affiche un formulaire modal pour ajouter un livre
function BookModal({ onClose, handleAdd, title, setTitle, author, setAuthor, genre, setGenre, totalPages, setTotalPages, completed, setCompleted, errors }) {
    // Styles appliqués aux champs de saisie (input)
    const inputStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        marginBottom: '10px'
    };

    // Styles appliqués au bouton de soumission
    const buttonStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '16px'
    };

    return (
        // Conteneur principal du modal avec position fixe, fond semi-transparent et centrage du contenu
        <div style={{
            position: 'fixed',
            top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000'
        }}>
            {/* Conteneur du contenu du modal avec fond blanc, padding, arrondis et ombre */}
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                width: '400px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                position: 'relative'
            }}>
                {/* Titre du modal */}
                <h2 style={{ margin: '0 0 20px', fontSize: '24px', textAlign: 'center' }}>Ajouter un Livre</h2>
                {/* Bouton pour fermer le modal */}
                <CloseButton onClick={onClose} />
                {/* Formulaire pour ajouter un livre, gestionnaire d'envoi déclenche handleAdd */}
                <form onSubmit={(e) => { e.preventDefault(); handleAdd(e); }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Champ texte pour le titre du livre avec gestionnaire onChange pour mettre à jour le titre */}
                        <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} style={{ ...inputStyle, borderColor: errors.title ? 'red' : '#ccc' }} />
                        {/* Affichage d'un tooltip d'erreur pour le titre si nécessaire */}
                        <ErrorTooltip message={errors.title} />
                        {/* Champ texte pour l'auteur avec gestionnaire onChange */}
                        <input type="text" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} style={{ ...inputStyle, borderColor: errors.author ? 'red' : '#ccc' }} />
                        {/* Tooltip d'erreur pour l'auteur */}
                        <ErrorTooltip message={errors.author} />
                        {/* Liste déroulante pour sélectionner un genre, triée alphabétiquement, avec gestionnaire onChange */}
                        <select value={genre} onChange={(e) => setGenre(e.target.value)} style={{ ...inputStyle, height: '40px', borderColor: errors.genre ? 'red' : '#ccc' }}>
                            <option value="">Sélectionner un genre</option>
                            {genres
                                .slice()
                                .sort((a, b) => a.localeCompare(b))
                                .map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                        </select>
                        {/* Tooltip d'erreur pour le genre */}
                        <ErrorTooltip message={errors.genre} />
                        {/* Champ numérique pour le nombre de pages avec gestionnaire onChange */}
                        <input type="number" placeholder="Nombre de pages" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} style={{ ...inputStyle, borderColor: errors.totalPages ? 'red' : '#ccc' }} />
                        {/* Tooltip d'erreur pour le nombre de pages */}
                        <ErrorTooltip message={errors.totalPages} />
                        {/* Checkbox pour marquer le livre comme terminé avec gestionnaire onChange */}
                        <label style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4CAF50', cursor: 'pointer' }} />
                            Marquer comme terminé
                        </label>
                        {/* Bouton de soumission pour ajouter le livre */}
                        <button type="submit" style={{ ...buttonStyle, marginTop: '10px' }}>Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookModal;