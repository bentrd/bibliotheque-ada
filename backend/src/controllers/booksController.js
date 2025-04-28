// Contrôleur de gestion des livres
// Permet d'ajouter, de mettre à jour, de récupérer et de supprimer les livres liés à l'utilisateur connecté

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Instanciation du client Prisma pour interagir avec la base de données

// Ajouter un livre pour l'utilisateur connecté
exports.addBook = async (req, res) => {
  const { title, author, totalPages, genre, currentPage } = req.body;

  try {
    // Vérifie si le livre est déjà terminé à l'ajout
    const completedAt = (currentPage && totalPages && currentPage >= totalPages) ? new Date() : null;

    // Création d'un nouveau livre associé à l'utilisateur connecté
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
    // Recherche le livre existant appartenant à l'utilisateur
    const existingBook = await prisma.book.findUnique({
      where: { id: parseInt(id), userId: req.user.userId },
    });

    if (!existingBook) {
      return res.status(404).json({ message: 'Livre non trouvé.' });
    }

    // Détermine si le livre est maintenant terminé après mise à jour
    const completedAt = (currentPage && existingBook.totalPages && currentPage >= existingBook.totalPages) ? new Date() : null;

    // Mise à jour de la page actuelle et éventuellement de la date de fin
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
    // Récupère tous les livres associés à l'utilisateur connecté
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
    // Supprime un livre appartenant à l'utilisateur par son ID
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