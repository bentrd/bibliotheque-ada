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
- Interface administrateur pour voir les utilisateurs et leurs livres.
- Notifications personnalisées.

---

## 🛠️ Stack technique

- **Frontend** : React + Vite
- **Backend** : Node.js + Express
- **Base de données** : SQLite via Prisma
- **Monorepo** : Organisation backend et frontend dans un seul projet
- **Authentification** : JWT
- **Gestion d'état** : Local Storage pour le token utilisateur

---

## 📦 Installation locale

Voici comment lancer le projet sur ton ordinateur :

### 1. Cloner le projet

```bash
git clone [URL_DU_REPO]
cd bibliotheque-ada
```

---

### 2. Installer les dépendances

Depuis la racine du projet :

```bash
npm install
```

Ensuite, installer séparément dans le backend et frontend :

```bash
cd backend
npm install
cd ../frontend
npm install
cd ..
```

---

### 3. Configurer l'environnement

Créer un fichier `.env` dans `/backend` :

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="une_clé_secrète_ici"
PORT=5500
```

---

### 4. Lancer la base de données

Depuis la racine du projet :

```bash
cd backend
npx prisma migrate dev --name init
cd ..
```

---

### 5. Démarrer le projet

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

## 🧠 À venir (idées futures)

- Statistiques avancées de lecture.
- Partage de profil entre utilisateurs.
- Système d'amis et de défis.
- Plus de badges exclusifs !

---

# ✨ Merci et bonne lecture !
