// Middleware d'authentification
// Vérifie la validité du token JWT pour sécuriser les routes
const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // Extraction du token JWT depuis l'en-tête Authorization

  if (!token) return res.sendStatus(401);
  // Aucun token fourni, accès non autorisé

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // Token invalide ou expiré, accès interdit
    req.user = user;
    next();
  });
  // Vérifie et décode le token, puis attache l'utilisateur au request
};