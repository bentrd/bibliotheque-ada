import React from 'react';
import './LevelProgress.css';

// Composant affichant la barre de progression du niveau en fonction des points de l'utilisateur
function LevelProgress({ points }) {
  // Définition des niveaux avec leurs plages de points associées
  const levels = [
    { label: 'Débutant', min: 0, max: 50 },      // Niveau Débutant : de 0 à 50 points
    { label: 'Amateur', min: 51, max: 150 },    // Niveau Amateur : de 51 à 150 points
    { label: 'Confirmé', min: 151, max: 300 },  // Niveau Confirmé : de 151 à 300 points
    { label: 'Expert', min: 301, max: 9999 },   // Niveau Expert : à partir de 301 points
  ];

  // Détermination si l'utilisateur est au niveau Expert
  const isExpert = points >= 301;

  // Calcul de la couleur de la barre de progression en fonction du niveau des points
  let barFill = 'linear-gradient(180deg, #ff4e50, #f44336)'; // Couleur par défaut pour Débutant

  if (isExpert) {
    // Couleur spéciale pour le niveau Expert (dégradé doré)
    barFill = 'linear-gradient(180deg, gold, #ffd700, #ffec8b)';
  } else if (points >= 151) {
    // Couleur pour le niveau Confirmé (dégradé vert)
    barFill = 'linear-gradient(180deg,rgb(67, 206, 83),rgb(35, 157, 24))';
  } else if (points >= 51) {
    // Couleur pour le niveau Amateur (dégradé orange)
    barFill = 'linear-gradient(180deg, #f9d423,rgb(255, 175, 78))';
  }

  return (
    <div style={{ marginTop: '30px', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      {/* Conteneur de la barre de progression avec les segments pour chaque niveau */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '12px',
        backgroundColor: 'transparent',
        marginBottom: '10px',
      }}>
        {levels.map((level, index) => {
          // Vérifie si les points actuels sont dans la plage du niveau courant
          const segmentPartial = points >= level.min && points <= level.max;

          // Calcul du pourcentage de remplissage du segment correspondant
          let fillPercent = 0;
          if (segmentPartial) {
            // Calcul proportionnel du remplissage dans la plage du niveau
            const range = Math.min(level.max, 300) - level.min;
            fillPercent = ((points - level.min) / range) * 100;
          } else if (points >= level.max) {
            // Si les points dépassent la plage, le segment est complètement rempli
            fillPercent = 100;
          }

          return (
            <div key={index} style={{
              flexGrow: 1,
              backgroundColor: '#ccc',  // Couleur de fond grise pour la partie non remplie
              borderRadius: '6px',
              overflow: 'hidden',
              margin: '0 4px',
              position: 'relative',
            }}>
              {/* Segment de la barre avec remplissage dynamique */}
              <div
                // Ajoute un effet visuel spécial si l'utilisateur est Expert
                className={isExpert ? 'expert-shine' : ''}
                style={{
                  width: isExpert ? '100%' : `${fillPercent}%`,  // Remplissage complet si Expert
                  height: '100%',
                  background: barFill,  // Couleur dégradée en fonction du niveau
                  boxShadow: isExpert ? '0 0 12px gold, 0 0 24px #ffd700, 0 0 36px #ffec8b' : 'none', // Effet lumineux Expert
                  transition: 'width 0.5s ease, background 0.8s ease, box-shadow 0.8s ease',
                  transitionDelay: `${index * 0.5}s`,  // Animation décalée par segment
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Affichage des labels des niveaux sous la barre de progression */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: '#555',
        paddingLeft: '5px',
        paddingRight: '5px',
      }}>
        {levels.map((level, index) => (
          <div key={index} style={{ textAlign: 'center', flex: 1 }}>
            {level.label} {/* Label du niveau (ex: Débutant, Amateur, etc.) */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LevelProgress;