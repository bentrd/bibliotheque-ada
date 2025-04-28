const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Ajouter un livre pour l'utilisateur connecté
exports.addBook = async (req, res) => {
  const { title, author, totalPages, genre, currentPage } = req.body;

  try {
    const completedAt = (currentPage && totalPages && currentPage >= totalPages) ? new Date() : null;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        totalPages,
        genre,
        currentPage: currentPage || 0,
        completedAt,
        userId: req.user.userId,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Mettre à jour la page actuelle
exports.updateCurrentPage = async (req, res) => {
  const { id } = req.params;
  const { currentPage } = req.body;

  try {
    const existingBook = await prisma.book.findUnique({
      where: { id: parseInt(id), userId: req.user.userId },
    });

    if (!existingBook) {
      return res.status(404).json({ message: 'Livre non trouvé.' });
    }

    const completedAt = (currentPage && existingBook.totalPages && currentPage >= existingBook.totalPages) ? new Date() : null;

    const book = await prisma.book.update({
      where: { id: parseInt(id), userId: req.user.userId },
      data: {
        currentPage,
        completedAt,
      },
    });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Récupérer tous les livres de l'utilisateur
exports.getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.user.userId },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Supprimer un livre par ID
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: {
        id: parseInt(id),
        userId: req.user.userId,
      },
    });
    res.json({ message: 'Livre supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};