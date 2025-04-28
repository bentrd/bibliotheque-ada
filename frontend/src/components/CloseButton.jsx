// Composant CloseButton
// Un bouton pour fermer un modal ou une fenêtre, avec un effet visuel de survol (changement de couleur et de taille).
function CloseButton({ onClick }) {
    // Ce composant rend un bouton avec un style circulaire et une croix "X" pour fermer une fenêtre ou un modal
    return (
        <button
            onClick={onClick}
            // Styles CSS en ligne appliqués au bouton : position absolue, taille, couleur, et effets visuels.
            style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px',
                lineHeight: '30px',
                textAlign: 'center',
                padding: '0',
                transition: 'transform 0.2s, background-color 0.2s'
            }}
            // Effet de survol : la couleur du bouton change et il devient légèrement plus grand lorsque la souris passe dessus
            onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#d32f2f';
                e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#f44336';
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            ⨉
        </button>
    );
}

export default CloseButton;