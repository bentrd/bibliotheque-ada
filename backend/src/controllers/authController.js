const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction d'inscription
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Fonction de connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Récupérer le profil
exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Modifier le profil
exports.updateProfile = async (req, res) => {
  const { email, password } = req.body;

  try {
    const dataToUpdate = {};
    if (email) dataToUpdate.email = email;
    if (password) dataToUpdate.password = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: dataToUpdate,
    });

    res.json({ message: 'Profil mis à jour avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};