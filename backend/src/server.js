// Serveur Express principal
// Gère le démarrage du serveur backend et la gestion des erreurs de port
const app = require('./app');
let PORT = process.env.PORT || 5500;

function startServer(port) {
  // Lance le serveur et écoute sur le port spécifié
  const server = app.listen(port, () => {
    console.log(`✅ Serveur backend écoute sur le port ${port}`);
  });

  // Gère les erreurs de démarrage, notamment si le port est déjà utilisé
  server.on('error', (err) => {
    // Si le port est déjà utilisé, tente de démarrer le serveur sur le port suivant
    if (err.code === 'EADDRINUSE') {
      console.error(`Le port ${port} est déjà utilisé. Tentative sur le port suivant...`);
      startServer(port + 1);
    } else {
      throw err;
    }
  });
}

// Démarre le serveur avec le port défini dans les variables d'environnement ou 5500 par défaut
startServer(PORT);