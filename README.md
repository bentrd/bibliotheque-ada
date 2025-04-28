# 📚 Bibliothèque ADA

Bienvenue sur le projet **Bibliothèque ADA** :  
Une application web permettant de **gérer vos lectures**, **suivre votre progression**, **accumuler des points** et **gagner des badges** !

---

## 🚀 Fonctionnalités principales

- Inscription / Connexion d'utilisateur.
- Ajout de livres avec **titre**, **auteur**, **genre**, **nombre de pages**.
- Mise à jour de la lecture page par page.
- Suivi du **niveau** (Débutant, Amateur, Confirmé, Expert).
- Attribution automatique de **points** et de **badges** 🎖️.
- Section Profil avec **tableau de bord animé**.
- Notifications personnalisées.

---

## 🛠️ Stack technique

- **Frontend** : React + Vite  
  ➔ Permet une interface rapide, moderne et dynamique avec un temps de chargement optimisé grâce à Vite.
- **Backend** : Node.js + Express  
  ➔ Léger et performant pour créer facilement une API REST rapide.
- **Base de données** : SQLite via Prisma  
  ➔ Simple à configurer, parfait pour des projets locaux ou prototypes rapides. Prisma facilite la gestion du modèle de données.
- **Monorepo** : Organisation backend et frontend dans un seul projet  
  ➔ Simplifie le développement et la maintenance avec un seul espace de travail.
- **Authentification** : JWT  
  ➔ Standard sécurisé pour authentifier les utilisateurs de façon simple et rapide.
- **Gestion d'état** : Local Storage pour le token utilisateur  
  ➔ Suffisant pour un projet de taille moyenne sans nécessiter d'outils lourds comme Redux.

---

## 📦 Installation locale

Voici comment lancer le projet sur ton ordinateur :

### 1. Cloner le projet

```bash
git clone https://github.com/bentrd/bibliotheque-ada
cd bibliotheque-ada
```

---

### 2. Installer toutes les dépendances

Depuis la racine du projet :

```bash
npm install
```

Grâce à l'utilisation des **workspaces**, cela installera automatiquement les dépendances du projet principal, du backend et du frontend en une seule commande.

---

### 3. Démarrer le projet

Depuis la racine (`/bibliotheque-ada`), lancer les deux serveurs en parallèle :

```bash
npm run dev
```

---

## 🔥 Scripts utiles

| Commande | Description |
|:---|:---|
| `npm run dev` | Démarre frontend + backend ensemble |
| `cd backend && npm run dev` | Démarre uniquement l'API |
| `cd frontend && npm run dev` | Démarre uniquement le client React |
| `npx prisma studio` | Ouvre un éditeur graphique pour la base de données |

---

## 📚 Infos supplémentaires

- Vous pouvez accéder à l'interface admin sur `http://localhost:5173/admin` (sans auth particulière pour le moment).
- La gestion de session est faite via **localStorage**.
- Les livres sont triés par nombre de pages et progression.
- Les animations sont gérées en CSS pour les badges, notifications et affichages dynamiques.

---

# ✨ Merci 👉🏻👈🏻
