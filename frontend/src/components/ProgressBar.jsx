function ProgressBar({ currentPage, totalPages }) {
    const progressPercent = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

    return (
        <div style={{
            backgroundColor: '#eee',
            borderRadius: '10px',
            width: '100%',
            height: '20px',
            marginTop: '5px',
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.2)'
        }}>
            <div style={{
                background: progressPercent < 30
                    ? 'linear-gradient(to right, #f44336, #ff7961)'
                    : progressPercent < 70
                        ? 'linear-gradient(to right, #ff9800, #ffc947)'
                        : 'linear-gradient(to right, #4CAF50, #80e27e)',
                height: '100%',
                width: `${progressPercent}%`,
                transition: 'width 0.5s ease, background 0.5s ease'
            }} />
        </div>
    );
}

export default ProgressBar;