// Composant représentant une carte d'un livre
// Affiche les informations du livre, son titre, auteur, genre, progression et permet de mettre à jour la page actuelle
import CloseButton from '../CloseButton';
import ProgressBar from '../ProgressBar';
import ErrorTooltip from '../ErrorTooltip';

function BookCard({ book, currentPageInput, setCurrentPageInput, handleProgressUpdate, handleDelete, progressErrors }) {
    // Ce composant affiche une carte pour chaque livre avec un bouton pour supprimer, une barre de progression et un champ de saisie pour la page actuelle.
    return (
        <li style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '250px',
            width: '300px',
            position: 'relative',
            textAlign: 'center'
        }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
            {/* Bouton pour supprimer le livre, avec confirmation de la suppression */}
            <CloseButton onClick={() => {
                if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
                    handleDelete(book.id);
                }
            }} />
            {/* Affichage des détails du livre : titre, auteur, genre et progression */}
            <div style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{book.title}</div>
                <div style={{ color: '#888', fontSize: '14px', marginTop: '5px' }}>{book.genre}</div>
                <div style={{ marginTop: '5px' }}>par {book.author}</div>
                <div style={{ marginTop: '5px', fontSize: '14px', color: '#666' }}>
                    ({book.currentPage}/{book.totalPages} pages)
                </div>
            </div>
            {/* Affichage de la progression du livre, avec un pourcentage de pages lues
                La barre de progression montre le statut du livre (en cours ou terminé) */}
            <div>
                Progression : {(book.totalPages > 0 ? (book.currentPage / book.totalPages) * 100 : 0).toFixed(1)}%
                {(book.totalPages > 0 && book.currentPage >= book.totalPages) && (
                    <div style={{ color: '#4CAF50', fontWeight: 'bold', marginTop: '5px' }}>
                        Livre terminé ✅
                    </div>
                )}
                <ProgressBar currentPage={book.currentPage} totalPages={book.totalPages} />
            </div>
            {/* Champ pour mettre à jour la page actuelle du livre
                Le bouton permet de mettre à jour la progression en fonction de la page saisie */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', marginRight: '10px', flexGrow: 1 }}>
                    <input
                        type="number"
                        placeholder={book.currentPage ? `${book.currentPage}` : "Page actuelle"}
                        min="0"
                        max={book.totalPages}
                        value={currentPageInput[book.id] || ''}
                        onChange={(e) => {
                            // Mise à jour de la page actuelle lorsque l'utilisateur entre une valeur
                            setCurrentPageInput({ ...currentPageInput, [book.id]: e.target.value });
                        }}
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: progressErrors[book.id] ? '1px solid red' : '1px solid #ccc',
                            fontSize: '16px'
                        }}
                    />
                    <ErrorTooltip message={progressErrors[book.id]} />
                </div>
                <button
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                    onClick={() => {
                        // Lorsque l'utilisateur clique sur "Mettre à jour", la fonction handleProgressUpdate est appelée pour actualiser la progression
                        handleProgressUpdate(book.id, book.totalPages);
                    }}
                >
                    Mettre à jour
                </button>
            </div>
        </li>
    );
}

export default BookCard;