import React, { useState, useEffect, Fragment } from 'react';
import API from '../services/api';
import ProgressBar from '../components/ProgressBar';

function DebugWebmaster() {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [expandedUserId, setExpandedUserId] = useState(null);

    useEffect(() => {
        const fetchDebugInfo = async () => {
            try {
                const res = await API.get('/admin');
                setUsers(res.data.users);
                setBooks(res.data.books);
            } catch (err) {
                setError('Accès refusé ou erreur serveur');
            }
        };
        fetchDebugInfo();
    }, []);

    const toggleUserBooks = (userId) => {
        setExpandedUserId(expandedUserId === userId ? null : userId);
    };

    if (error) {
        return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Page Debug Webmaster</h2>

            {users.map(user => (
                <div key={user.id} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', backgroundColor: '#f9f9f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <strong>{user.email}</strong> (ID: {user.id})
                        </div>
                        <button onClick={() => toggleUserBooks(user.id)} style={{
                            padding: '5px 10px',
                            backgroundColor: expandedUserId === user.id ? '#f44336' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>
                            {expandedUserId === user.id ? 'Fermer' : 'Voir les livres'}
                        </button>
                    </div>

                    {expandedUserId === user.id && (
                        <div style={{ marginTop: '15px' }}>
                            {books.filter(book => book.userId === user.id).length === 0 ? (
                                <p style={{ fontStyle: 'italic', color: '#666' }}>Aucun livre pour cet utilisateur.</p>
                            ) : (
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                                            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Titre</th>
                                            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Auteur</th>
                                            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Pages</th>
                                            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Progression</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.filter(book => book.userId === user.id).map(book => (
                                            <tr key={book.id}>
                                                <td style={{ padding: '8px', border: '1px solid #ccc' }}>
                                                    {book.title}
                                                </td>
                                                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{book.author}</td>
                                                <td style={{ padding: '8px', border: '1px solid #ccc' }}>{book.currentPage}/{book.totalPages}</td>
                                                <td style={{ padding: '8px', border: '1px solid #ccc' }}>
                                                    <ProgressBar currentPage={book.currentPage} totalPages={book.totalPages} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default DebugWebmaster;