function SortControls({ sortOption, setSortOption, sortOrder, setSortOrder, openModal }) {
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

    const inputStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px'
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <button style={buttonStyle} onClick={openModal}>Ajouter un livre</button>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={{ ...inputStyle, width: '200px', height: '40px' }}>
                <option value="">Trier par</option>
                <option value="title">Titre</option>
                <option value="author">Auteur</option>
                <option value="genre">Genre</option>
                <option value="progress">Progression (%)</option>
            </select>
            <button style={buttonStyle} onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                Inverser l'ordre
            </button>
        </div>
    );
}

export default SortControls;