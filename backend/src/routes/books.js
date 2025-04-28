const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Ajouter un livre lu
router.post('/', authenticateToken, booksController.addBook);

// Récupérer les livres lus
router.get('/', authenticateToken, booksController.getBooks);

// Supprimer un livre
router.delete('/:id', authenticateToken, booksController.deleteBook);

// Mise à jour de la progression
router.put('/:id/progress', authenticateToken, booksController.updateCurrentPage);

module.exports = router;