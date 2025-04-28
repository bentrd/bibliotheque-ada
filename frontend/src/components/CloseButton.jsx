function CloseButton({ onClick }) {
    return (
        <button
            onClick={onClick}
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