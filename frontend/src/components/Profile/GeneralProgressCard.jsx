import LevelProgress from './LevelProgress';

function GeneralProgressCard({ books, calculatePoints }) {

  // Fonction qui détermine le niveau de l'utilisateur en fonction du nombre de points accumulés.
  // Elle retourne une chaîne de caractères correspondant au niveau : Débutant, Amateur, Confirmé ou Expert.
  const calculateLevel = (points) => {
    if (points <= 50) return 'Débutant';
    if (points <= 150) return 'Amateur';
    if (points <= 300) return 'Confirmé';
    return 'Expert';
  };

  // Calcul des points totaux en appelant la fonction passée en props.
  // Cette fonction doit retourner le nombre total de points accumulés par l'utilisateur.
  const points = calculatePoints();

  return (
    // Conteneur principal avec un style appliqué pour le fond, les marges, le padding, la bordure arrondie et l'ombre portée.
    <div style={{
      backgroundColor: 'white',       // Fond blanc pour le composant
      padding: '20px',                 // Espace intérieur de 20px autour du contenu
      borderRadius: '10px',            // Bords arrondis avec un rayon de 10px
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // Ombre portée légère pour donner de la profondeur
      marginBottom: '30px'             // Marge inférieure pour espacer ce composant des suivants
    }}>
      {/* Titre principal du composant avec une taille de police plus grande et une marge inférieure */}
      <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Progrès Général</h3>

      {/* Affichage du nombre total de livres lus, calculé en filtrant les livres où la page actuelle est supérieure ou égale au total des pages */}
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>
        Total de livres lus : {books.filter(book => book.currentPage >= book.totalPages).length}
      </p>
      {/* Affichage du total des points accumulés */}
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>
        Points accumulés : {points}
      </p>
      {/* Affichage du niveau actuel avec une mise en forme en gras et une couleur verte */}
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
        Niveau actuel : <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>{calculateLevel(points)}</span>
      </p>

      {/* Composant enfant affichant une barre de progression correspondant aux points accumulés */}
      <LevelProgress points={points} />
    </div>
  );
}

export default GeneralProgressCard;