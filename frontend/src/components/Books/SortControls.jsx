// Composant de contrôle du tri et des actions pour la liste des livres
// Props :
// - sortOption: option de tri sélectionnée
// - setSortOption: fonction pour changer l'option de tri
// - sortOrder: ordre de tri ('asc' ou 'desc')
// - setSortOrder: fonction pour inverser l'ordre de tri
// - openModal: fonction pour ouvrir la fenêtre d'ajout de livre
function SortControls({ sortOption, setSortOption, sortOrder, setSortOrder, openModal }) {
    // Styles pour les boutons afin d'assurer une apparence uniforme et attrayante
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

    // Styles pour les champs de saisie et la liste déroulante
    const inputStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px'
    };

    // Ce composant affiche les contrôles permettant d'ajouter un livre, de trier la liste et d'inverser l'ordre de tri
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            {/* Bouton pour ouvrir la fenêtre d'ajout d'un nouveau livre */}
            <button style={buttonStyle} onClick={openModal}>Ajouter un livre</button>

            {/* Liste déroulante pour choisir l'option de tri (titre, auteur, genre, progression) */}
            {/* L'événement onChange met à jour l'option de tri sélectionnée via setSortOption */}
            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)} // Met à jour l'option de tri selon la sélection de l'utilisateur
                style={{ ...inputStyle, width: '200px', height: '40px' }}
            >
                <option value="">Trier par</option>
                <option value="title">Titre</option>
                <option value="author">Auteur</option>
                <option value="genre">Genre</option>
                <option value="progress">Progression (%)</option>
            </select>

            {/* Bouton pour inverser l'ordre de tri (ascendant/descendant) */}
            {/* L'événement onClick inverse la valeur de sortOrder via setSortOrder */}
            <button
                style={buttonStyle}
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} // Inverse l'ordre de tri lorsqu'on clique sur le bouton
            >
                Inverser l'ordre
            </button>
        </div>
    );
}

export default SortControls;