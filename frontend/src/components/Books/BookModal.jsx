import CloseButton from '../CloseButton';
import ErrorTooltip from '../ErrorTooltip';
import genres from '../../data/genres';

function BookModal({ onClose, handleAdd, title, setTitle, author, setAuthor, genre, setGenre, totalPages, setTotalPages, completed, setCompleted, errors }) {
    const inputStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        marginBottom: '10px'
    };

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
        <div style={{
            position: 'fixed',
            top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                width: '400px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                position: 'relative'
            }}>
                <CloseButton onClick={onClose} />
                <form onSubmit={handleAdd}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} style={{ ...inputStyle, borderColor: errors.title ? 'red' : '#ccc' }} />
                        <ErrorTooltip message={errors.title} />
                        <input type="text" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} style={{ ...inputStyle, borderColor: errors.author ? 'red' : '#ccc' }} />
                        <ErrorTooltip message={errors.author} />
                        <select value={genre} onChange={(e) => setGenre(e.target.value)} style={{ ...inputStyle, height: '40px', borderColor: errors.genre ? 'red' : '#ccc' }}>
                            <option value="">Sélectionner un genre</option>
                            {genres
                                .slice()
                                .sort((a, b) => a.localeCompare(b))
                                .map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                        </select>
                        <ErrorTooltip message={errors.genre} />
                        <input type="number" placeholder="Nombre de pages" value={totalPages} onChange={(e) => setTotalPages(e.target.value)} style={{ ...inputStyle, borderColor: errors.totalPages ? 'red' : '#ccc' }} />
                        <ErrorTooltip message={errors.totalPages} />
                        <label style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#4CAF50', cursor: 'pointer' }} />
                            Marquer comme terminé
                        </label>
                        <button type="submit" style={{ ...buttonStyle, marginTop: '10px' }}>Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookModal;