const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Contrôleur d'authentification utilisateur
// Gère l'inscription, la connexion et la gestion du profil via Prisma et JWT

// Fonction d'inscription d'un nouvel utilisateur
exports.register = async (req, res) => {
  const { email, password } = req.body; // Extraction des données envoyées par l'utilisateur

  try {
    // Vérifie si un utilisateur existe déjà avec cet email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hashage du mot de passe pour sécuriser les données stockées
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur dans la base de données
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    // Réponse positive à l'inscription réussie
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    // Gestion des erreurs serveur
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Fonction de connexion d'un utilisateur existant
exports.login = async (req, res) => {
  const { email, password } = req.body; // Extraction des données envoyées par l'utilisateur

  try {
    // Recherche de l'utilisateur dans la base via son email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Vérification du mot de passe avec le hash stocké
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Génération d'un token JWT pour la session utilisateur
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Envoi du token au client pour authentification future
    res.json({ token });
  } catch (error) {
    // Gestion des erreurs serveur
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Fonction pour récupérer le profil de l'utilisateur connecté
exports.getProfile = async (req, res) => {
  try {
    // Recherche de l'utilisateur par son ID extrait du token d'authentification
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true }, // Sélection des champs à retourner
    });
    // Envoi des données utilisateur au client
    res.json(user);
  } catch (error) {
    // Gestion des erreurs serveur
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Fonction pour modifier le profil de l'utilisateur connecté
exports.updateProfile = async (req, res) => {
  const { email, password } = req.body; // Extraction des nouvelles données envoyées par l'utilisateur

  try {
    const dataToUpdate = {};
    if (email) dataToUpdate.email = email; // Mise à jour de l'email si fourni
    if (password) dataToUpdate.password = await bcrypt.hash(password, 10); // Hashage du nouveau mot de passe

    // Mise à jour des informations dans la base de données
    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: dataToUpdate,
    });

    // Confirmation de la mise à jour au client
    res.json({ message: 'Profil mis à jour avec succès.' });
  } catch (error) {
    // Gestion des erreurs serveur
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};