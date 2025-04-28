function Badges({ books }) {

  const countBooksInPeriod = (books, days) => {
    const now = new Date();
    return books.filter(book => {
      if (!book.completedAt) return false;
      const completedDate = new Date(book.completedAt);
      const diffTime = now - completedDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays <= days;
    }).length;
  };

  const countBooksThisMonth = (books) => {
    const now = new Date();
    return books.filter(book => {
      if (!book.completedAt) return false;
      const completedDate = new Date(book.completedAt);
      return completedDate.getMonth() === now.getMonth() && completedDate.getFullYear() === now.getFullYear();
    }).length;
  };

  const countBooksThisYear = (books) => {
    const now = new Date();
    return books.filter(book => {
      if (!book.completedAt) return false;
      const completedDate = new Date(book.completedAt);
      return completedDate.getFullYear() === now.getFullYear();
    }).length;
  };

  const calculateBadges = () => {
    const earnedBadges = [];

    const completedBooks = books.filter(book => book.currentPage >= book.totalPages && book.totalPages > 0);
    const completedCount = completedBooks.length;

    if (completedCount >= 1) earnedBadges.push({ icon: '📖', title: 'Première Lecture', description: 'Terminer votre premier livre' });
    if (completedCount >= 5) earnedBadges.push({ icon: '📚', title: 'Lecteur·trice assidu·e', description: 'Terminer 5 livres' });
    if (completedCount >= 20) earnedBadges.push({ icon: '🏆', title: 'Bibliophile', description: 'Terminer 20 livres' });

    const genresRead = new Set(completedBooks.map(book => book.genre));
    if (genresRead.size >= 3) earnedBadges.push({ icon: '🌍', title: 'Explorer les genres', description: 'Lire 3 genres différents' });
    if (genresRead.size >= 5) earnedBadges.push({ icon: '🧭', title: 'Aventurier·ère littéraire', description: 'Lire 5 genres différents' });

    const bigBookRead = completedBooks.some(book => book.totalPages > 300);
    if (bigBookRead) earnedBadges.push({ icon: '🏋️‍♂️', title: 'Marathon de lecture', description: 'Terminer un livre de plus de 300 pages' });

    if (countBooksInPeriod(completedBooks, 14) >= 5) {
      earnedBadges.push({ icon: '⏱️', title: 'Lecture rapide', description: 'Lire 5 livres en moins de 2 semaines' });
    }
    if (countBooksThisMonth(completedBooks) >= 10) {
      earnedBadges.push({ icon: '📅', title: '10 livres dans un mois', description: 'Lire 10 livres dans un mois' });
    }
    if (countBooksThisYear(completedBooks) >= 30) {
      earnedBadges.push({ icon: '🗓️', title: '30 livres dans une année', description: 'Lire 30 livres dans l’année' });
    }

    return earnedBadges;
  };

  const getBadgeColor = (title) => {
    switch (title) {
      case 'Première Lecture':
        return '#E3F2FD';
      case 'Lecteur·trice assidu·e':
        return '#E8F5E9';
      case 'Bibliophile':
        return '#FFF3E0';
      case 'Explorer les genres':
        return '#F3E5F5';
      case 'Aventurier·ère littéraire':
        return '#FCE4EC';
      case 'Marathon de lecture':
        return '#E0F7FA';
      default:
        return '#f5f5f5';
    }
  };

  const badges = calculateBadges();

  return (
    <>
      <style>
      {`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
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
        <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Mes Badges</h3>
        {badges.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#666' }}>Aucun badge débloqué pour l'instant.</p>
        ) : (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px'
          }}>
            {badges.map((badge, index) => (
              <div key={index} style={{
                backgroundColor: getBadgeColor(badge.title),
                padding: '10px',
                borderRadius: '8px',
                textAlign: 'center',
                width: '130px',
                opacity: 0,
                animation: `fadeIn 0.6s ease forwards`,
                animationDelay: `${index * 0.2}s`
              }}>
                <span style={{ fontSize: '24px' }}>{badge.icon}</span>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{badge.title}</div>
                <div style={{ fontSize: '12px', color: '#777' }}>{badge.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Badges;