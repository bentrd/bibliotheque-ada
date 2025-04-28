import React from 'react';
import './LevelProgress.css';

function LevelProgress({ points }) {
  const levels = [
    { label: 'Débutant', min: 0, max: 50 },
    { label: 'Amateur', min: 51, max: 150 },
    { label: 'Confirmé', min: 151, max: 300 },
    { label: 'Expert', min: 301, max: 9999 },
  ];

  // Expert and barFill logic
  const isExpert = points >= 301;
  let barFill = 'linear-gradient(180deg, #ff4e50, #f44336)'; // Default Débutant

  if (points >= 301) {
    barFill = 'linear-gradient(180deg, gold, #ffd700, #ffec8b)';
  } else if (points >= 151) {
    barFill = 'linear-gradient(180deg,rgb(67, 206, 83),rgb(35, 157, 24))';
  } else if (points >= 51) {
    barFill = 'linear-gradient(180deg, #f9d423,rgb(255, 175, 78))';
  }

  return (
    <div style={{ marginTop: '30px', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '12px',
        backgroundColor: 'transparent',
        marginBottom: '10px',
      }}>
        {levels.map((level, index) => {
          const segmentPartial = points >= level.min && points <= level.max;
          let fillPercent = 0;
          if (segmentPartial) {
            const range = Math.min(level.max, 300) - level.min;
            fillPercent = ((points - level.min) / range) * 100;
          } else if (points >= level.max) {
            fillPercent = 100;
          }

          return (
            <div key={index} style={{
              flexGrow: 1,
              backgroundColor: '#ccc',
              borderRadius: '6px',
              overflow: 'hidden',
              margin: '0 4px',
              position: 'relative',
            }}>
              <div
                className={isExpert ? 'expert-shine' : ''}
                style={{
                  width: isExpert ? '100%' : `${fillPercent}%`,
                  height: '100%',
                  background: barFill,
                  boxShadow: isExpert ? '0 0 12px gold, 0 0 24px #ffd700, 0 0 36px #ffec8b' : 'none',
                  transition: 'width 0.5s ease, background 0.8s ease, box-shadow 0.8s ease',
                  transitionDelay: `${index * 0.5}s`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Level labels */}
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
            {level.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LevelProgress;