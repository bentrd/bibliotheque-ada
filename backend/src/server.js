const app = require('./app');
let PORT = process.env.PORT || 5500;

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`✅ Serveur backend écoute sur le port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Le port ${port} est déjà utilisé. Tentative sur le port suivant...`);
      startServer(port + 1);
    } else {
      throw err;
    }
  });
}

startServer(PORT);