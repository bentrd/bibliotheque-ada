import { useState, useEffect } from 'react';
import API from '../services/api';
import BookCard from '../components/Books/BookCard';
import BookModal from '../components/Books/BookModal';
import SortControls from '../components/Books/SortControls';


function Books() {

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [currentPageInput, setCurrentPageInput] = useState({});
  const [genre, setGenre] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [progressErrors, setProgressErrors] = useState({});
  const [completed, setCompleted] = useState(false);

  const fetchBooks = async () => {
    try {
      const res = await API.get('/books');
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Le titre est requis.';
    if (!author.trim()) newErrors.author = 'L\'auteur est requis.';
    if (!genre.trim()) newErrors.genre = 'Le genre est requis.';
    if (!totalPages || isNaN(totalPages) || totalPages <= 0) newErrors.totalPages = 'Le nombre de pages doit être positif.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await API.post('/books', {
        title,
        author,
        totalPages: parseInt(totalPages),
        genre,
        currentPage: completed ? parseInt(totalPages) : 0
      });
      setTitle('');
      setAuthor('');
      setTotalPages('');
      setGenre('');
      setErrors({});
      setShowModal(false);
      setCompleted(false);
      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      alert('Erreur lors de la suppression');
    }
  };

  const handleProgressUpdate = async (id, totalPages) => {
    const currentPage = parseInt(currentPageInput[id]);
    const newProgressErrors = {};

    if (isNaN(currentPage) || currentPage < 0 || currentPage > totalPages) {
      newProgressErrors[id] = `La page doit être entre 0 et ${totalPages}.`;
      setProgressErrors(newProgressErrors);
      return;
    }

    try {
      await API.put(`/books/${id}/progress`, { currentPage });
      fetchBooks();
      setProgressErrors({}); // Clear errors after success
    } catch (error) {
      console.error(error);
    }
  };

  const sortedBooks = [...books];

  if (sortOption === 'title') {
    sortedBooks.sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
  } else if (sortOption === 'author') {
    sortedBooks.sort((a, b) => sortOrder === 'asc' ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author));
  } else if (sortOption === 'genre') {
    sortedBooks.sort((a, b) => sortOrder === 'asc' ? a.genre.localeCompare(b.genre) : b.genre.localeCompare(a.genre));
  } else if (sortOption === 'progress') {
    sortedBooks.sort((a, b) => {
      const progressA = a.totalPages > 0 ? a.currentPage / a.totalPages : 0;
      const progressB = b.totalPages > 0 ? b.currentPage / b.totalPages : 0;
      return sortOrder === 'asc' ? progressB - progressA : progressA - progressB;
    });
  }

  return (
    <div style={{ margin: '10px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Mes Livres</h2>
      <SortControls
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        openModal={() => setShowModal(true)}
      />
      {showModal && (
        <BookModal
          onClose={() => setShowModal(false)}
          handleAdd={handleAdd}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          genre={genre}
          setGenre={setGenre}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          completed={completed}
          setCompleted={setCompleted}
          errors={errors}
        />
      )}
      <ul style={{
        listStyle: 'none',
        padding: '0',
        width: '90%',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        overflow: 'hidden'
      }}>
        {sortedBooks.length === 0 ? (
          <li style={{ textAlign: 'center', marginTop: '20px', fontStyle: 'italic', color: '#666' }}>
            Il n'y a pas encore de livres. Ajoutez votre premier livre !
          </li>
        ) : (
          sortedBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              currentPageInput={currentPageInput}
              setCurrentPageInput={setCurrentPageInput}
              handleProgressUpdate={handleProgressUpdate}
              handleDelete={handleDelete}
              progressErrors={progressErrors}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default Books;