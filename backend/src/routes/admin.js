// Route d'administration
// Permet d'afficher tous les utilisateurs et tous les livres stockés dans la base de données
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Route GET /admin
// Récupère et renvoie toutes les informations des utilisateurs et des livres
router.get('/', async (req, res) => {
  try {
    // Récupération de tous les utilisateurs enregistrés
    const users = await prisma.user.findMany();
    // Récupération de tous les livres enregistrés
    const books = await prisma.book.findMany();
    res.json({ users, books });
  } catch (error) {
    // En cas d'erreur, afficher l'erreur et renvoyer un message d'erreur générique
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;