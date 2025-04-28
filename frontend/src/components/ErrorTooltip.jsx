// Componsant de tooltip d'erreur
// Ce composant affiche un message d'erreur sous forme de tooltip lorsque l'utilisateur entre une valeur incorrecte dans le champ de saisie.
function ErrorTooltip({ message }) {
    // S'il n'y a pas de message, ne rien afficher
    if (!message) return null;

    return (
      <div style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '5px',
        backgroundColor: '#ffe6e6',
        color: '#cc0000',
        fontSize: '12px',
        padding: '5px 10px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        animation: 'fadeIn 0.3s ease-in-out',
        whiteSpace: 'nowrap',
        zIndex: 10
      }}>
        {message}
        <div style={{
          position: 'absolute',
          top: '-5px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: '5px solid #ffe6e6'
        }} />
      </div>
    );
}

export default ErrorTooltip;