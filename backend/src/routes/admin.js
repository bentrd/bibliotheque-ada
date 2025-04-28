const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Route simple pour renvoyer tout
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    const books = await prisma.book.findMany();
    res.json({ users, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;