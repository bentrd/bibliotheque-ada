import LevelProgress from './LevelProgress';

function GeneralProgressCard({ books, calculatePoints }) {

  const calculateLevel = (points) => {
    if (points <= 50) return 'Débutant';
    if (points <= 150) return 'Amateur';
    if (points <= 300) return 'Confirmé';
    return 'Expert';
  };

  const points = calculatePoints();

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    }}>
      <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Progrès Général</h3>

      <p style={{ fontSize: '18px', marginBottom: '10px' }}>
        Total de livres lus : {books.filter(book => book.currentPage >= book.totalPages).length}
      </p>
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>
        Points accumulés : {points}
      </p>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        Niveau actuel : <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>{calculateLevel(points)}</span>
      </p>

      <LevelProgress points={points} />
    </div>
  );
}

export default GeneralProgressCard;