function BookTrackingCard({ books }) {
    const sortedBooks = [...books].sort((a, b) => {
        const aFinished = a.currentPage >= a.totalPages;
        const bFinished = b.currentPage >= b.totalPages;

        if (aFinished && !bFinished) return -1;
        if (!aFinished && bFinished) return 1;

        // Both finished or both unfinished, sort by totalPages descending
        return b.currentPage - a.currentPage;
    });

    return (
        <>
        <style>
        {`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
        </style>
        <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '30px'
        }}>
            <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Suivi des Livres</h3>
            {books.length === 0 ? (
                <p style={{ fontStyle: 'italic', color: '#666' }}>Aucun livre ajouté pour le moment.</p>
            ) : (
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'center'
                }}>
                    {sortedBooks.map((book, index) => (
                        <li key={index} style={{
                            opacity: 0,
                            animation: `fadeIn 0.6s ease forwards`,
                            animationDelay: `${index * 0.2}s`,
                            width: '250px',
                            minHeight: '100px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundColor: '#eee',
                            border: book.currentPage >= book.totalPages ? '2px solid #4CAF50' : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: `${(book.currentPage / book.totalPages) * 100}%`,
                                background: (book.currentPage / book.totalPages) * 100 < 30
                                    ? 'linear-gradient(to right, #f44336, #ff7961)'
                                    : (book.currentPage / book.totalPages) * 100 < 70
                                        ? 'linear-gradient(to right, #ff9800, #ffc947)'
                                        : 'linear-gradient(to right, #4CAF50, #80e27e)',
                                opacity: 0.3,
                                transition: 'width 0.5s ease, background 0.5s ease'
                            }} />
                            <div style={{ position: 'relative', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{book.title}</div>
                                    <div style={{ fontSize: '13px', color: '#555', marginBottom: '3px' }}>
                                        {book.author || 'Auteur inconnu'}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px' }}>
                                        {book.genre || 'Genre inconnu'}
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#777' }}>
                                        {`${book.currentPage}/${book.totalPages} pages`}
                                    </div>
                                </div>
                                {book.currentPage >= book.totalPages && (
                                    <div style={{ fontWeight: 'bold', color: '#4CAF50', fontSize: '16px', textWrap: 'nowrap' }}>
                                        +{book.totalPages < 150 ? 10 : book.totalPages <= 300 ? 20 : 30} pts
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </>
    );
}

export default BookTrackingCard;