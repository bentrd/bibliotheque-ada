import { useState, useEffect } from 'react';
import API from '../services/api';
import GeneralProgressCard from '../components/Profile/GeneralProgressCard';
import BookTrackingCard from '../components/Profile/BookTrackingCard';
import BadgesSection from '../components/Profile/Badges';
import ProfileModal from '../components/Profile/ProfileModal';

function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/auth/me');
        setEmail(res.data.email);
        const booksRes = await API.get('/books');
        setBooks(booksRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const calculatePoints = () => {
    let points = 0;
    books.forEach(book => {
      if (book.currentPage >= book.totalPages && book.totalPages > 0) {
        if (book.totalPages < 150) points += 10;
        else if (book.totalPages <= 300) points += 20;
        else points += 30;
      }
    });
    return points;
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '28px', color: '#333' }}>Tableau de Bord</h2>
        <button onClick={() => setShowModal(true)} style={{
          padding: '10px 15px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#4CAF50',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background-color 0.3s'
        }}>
          Modifier
        </button>
      </div>

      <GeneralProgressCard books={books} calculatePoints={calculatePoints} />
      <BadgesSection books={books} />
      <BookTrackingCard books={books} />

      {showModal && (
        <ProfileModal
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default Profile;